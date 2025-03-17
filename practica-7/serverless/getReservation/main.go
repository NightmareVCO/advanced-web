package main

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type APIGatewayProxyRequest struct {
	Body  string `json:"body"`
	Query string `json:"rawQueryString"`
}

type QueryStringParameters struct {
	RequestedInitialDate string
	RequestedFinalDate   string
}

type Date struct {
	Day   string
	Month string
	Year  string
}

type DateEnum int
type DateIndex int

const (
	Day DateEnum = iota
	Month
	Year
)

const (
	InitialDate DateIndex = iota
	FinalDate
)

var (
	dynamoDBClient *dynamodb.Client
	tableName      = "reservations"
)

func init() {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatalf("failed to load configuration, %v", err)
	}

	dynamoDBClient = dynamodb.NewFromConfig(cfg)
}

func parseQueryParams(event APIGatewayProxyRequest) (QueryStringParameters, error) {
	if event.Query == "" {
		return QueryStringParameters{}, fmt.Errorf("no query parameters")
	}

	var query QueryStringParameters

	params := strings.Split(event.Query, "&")
	if len(params) != 2 {
		return query, fmt.Errorf("invalid query parameters")
	}

	for _, param := range params {
		kv := strings.Split(param, "=")
		if len(kv) != 2 {
			continue
		}

		key, value := kv[0], kv[1]
		switch key {
		case "requestedInitialDate":
			query.RequestedInitialDate = value
		case "requestedFinalDate":
			query.RequestedFinalDate = value
		}
	}

	return query, nil
}

func getDateFromQuery(query QueryStringParameters) []Date {
	var dates []Date

	initialDate := strings.Split(query.RequestedInitialDate, "-")
	finalDate := strings.Split(query.RequestedFinalDate, "-")

	initialDay, initialMonth, initialYear := initialDate[Day], initialDate[Month], initialDate[Year]
	finalDay, finalMonth, finalYear := finalDate[Day], finalDate[Month], finalDate[Year]

	dates = append(dates, Date{
		Day:   fmt.Sprintf("%02s", initialDay),
		Month: fmt.Sprintf("%02s", initialMonth),
		Year:  initialYear,
	})
	dates = append(dates, Date{
		Day:   fmt.Sprintf("%02s", finalDay),
		Month: fmt.Sprintf("%02s", finalMonth),
		Year:  finalYear,
	})

	return dates
}

func handleRequest(ctx context.Context, event APIGatewayProxyRequest) (*dynamodb.ScanOutput, error) {
	scanInput := &dynamodb.ScanInput{
		TableName: &tableName,
	}

	query, err := parseQueryParams(event)
	if err == nil {
		dates := getDateFromQuery(query)

		if len(dates) != 2 {
			return nil, fmt.Errorf("invalid query parameters")
		}

		queryExpression := "(requestedYear > :initialYear OR " +
			"(requestedYear = :initialYear AND requestedMonth > :initialMonth) OR " +
			"(requestedYear = :initialYear AND requestedMonth = :initialMonth AND requestedDay >= :initialDay)) " +
			"AND (requestedYear < :finalYear OR " +
			"(requestedYear = :finalYear AND requestedMonth < :finalMonth) OR " +
			"(requestedYear = :finalYear AND requestedMonth = :finalMonth AND requestedDay <= :finalDay))"

		queryExpressionValue := map[string]types.AttributeValue{
			":initialDay":   &types.AttributeValueMemberN{Value: dates[InitialDate].Day},
			":initialMonth": &types.AttributeValueMemberN{Value: dates[InitialDate].Month},
			":initialYear":  &types.AttributeValueMemberN{Value: dates[InitialDate].Year},
			":finalDay":     &types.AttributeValueMemberN{Value: dates[FinalDate].Day},
			":finalMonth":   &types.AttributeValueMemberN{Value: dates[FinalDate].Month},
			":finalYear":    &types.AttributeValueMemberN{Value: dates[FinalDate].Year},
		}

		scanInput.FilterExpression = &queryExpression
		scanInput.ExpressionAttributeValues = queryExpressionValue
	} else {
		now := time.Now()
		today := Date{
			Day:   fmt.Sprintf("%02d", now.Day()),
			Month: fmt.Sprintf("%02d", int(now.Month())),
			Year:  fmt.Sprintf("%d", now.Year()),
		}

		queryExpression := "(requestedYear > :todayYear) OR " +
			"(requestedYear = :todayYear AND requestedMonth > :todayMonth) OR " +
			"(requestedYear = :todayYear AND requestedMonth = :todayMonth AND requestedDay >= :todayDay)"

		queryExpressionValue := map[string]types.AttributeValue{
			":todayDay":   &types.AttributeValueMemberN{Value: today.Day},
			":todayMonth": &types.AttributeValueMemberN{Value: today.Month},
			":todayYear":  &types.AttributeValueMemberN{Value: today.Year},
		}

		scanInput.FilterExpression = &queryExpression
		scanInput.ExpressionAttributeValues = queryExpressionValue
	}

	defaultOutput := &dynamodb.ScanOutput{
		Items: []map[string]types.AttributeValue{
			{
				"id":             &types.AttributeValueMemberS{Value: "0"},
				"labName":        &types.AttributeValueMemberS{Value: "Not found"},
				"requestedDay":   &types.AttributeValueMemberS{Value: "00"},
				"requestedMonth": &types.AttributeValueMemberS{Value: "00"},
				"requestedYear":  &types.AttributeValueMemberS{Value: "0000"},
				"requestedHour":  &types.AttributeValueMemberS{Value: "0"},
				"student": &types.AttributeValueMemberM{
					Value: map[string]types.AttributeValue{
						"id":    &types.AttributeValueMemberS{Value: "0"},
						"name":  &types.AttributeValueMemberS{Value: "Not found"},
						"email": &types.AttributeValueMemberS{Value: "notfound@notfound.com"},
					},
				},
			},
		},
	}

	output, err := dynamoDBClient.Scan(context.TODO(), scanInput)
	if err != nil {
		log.Fatalf("failed to get item: %v", err)
		return defaultOutput, fmt.Errorf("failed to get item: %v", err)
	}

	return output, nil
}

func main() {
	lambda.Start(handleRequest)
}
