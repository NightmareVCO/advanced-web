package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type Student struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type APIGatewayProxyRequest struct {
	Body  string `json:"body"`
	Query string `json:"rawQueryString"`
}

type QueryStringParameters struct {
	RequestedTime  string
	RequestedDay   string
	RequestedMonth string
	RequestedYear  string
}

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

func parseQueryParams(event APIGatewayProxyRequest) QueryStringParameters {
	var query QueryStringParameters

	params := strings.Split(event.Query, "&")
	for _, param := range params {
		kv := strings.Split(param, "=")
		if len(kv) != 2 {
			continue
		}

		key, value := kv[0], kv[1]
		switch key {
		case "requestedTime":
			query.RequestedTime = value
		case "requestedDay":
			query.RequestedDay = value
		case "requestedMonth":
			query.RequestedMonth = value
		case "requestedYear":
			query.RequestedYear = value
		}
	}

	return query
}

func handleRequest(ctx context.Context, event APIGatewayProxyRequest) (*dynamodb.ScanOutput, error) {
	var query QueryStringParameters = parseQueryParams(event)
	queryExpression := "requestedHour = :requestedHour AND requestedDay = :requestedDay AND requestedMonth = :requestedMonth AND requestedYear = :requestedYear"

	scanInput := &dynamodb.ScanInput{
		TableName:        &tableName,
		FilterExpression: &queryExpression,
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":requestedHour":  &types.AttributeValueMemberS{Value: query.RequestedTime},
			":requestedDay":   &types.AttributeValueMemberS{Value: query.RequestedDay},
			":requestedMonth": &types.AttributeValueMemberS{Value: query.RequestedMonth},
			":requestedYear":  &types.AttributeValueMemberS{Value: query.RequestedYear},
		},
	}

	defaultOutput := &dynamodb.ScanOutput{
		Items: []map[string]types.AttributeValue{
			{
				"id":             &types.AttributeValueMemberS{Value: "0"},
				"labName":        &types.AttributeValueMemberS{Value: "Not found"},
				"requestedHour":  &types.AttributeValueMemberS{Value: "00"},
				"requestedDay":   &types.AttributeValueMemberS{Value: "00"},
				"requestedMonth": &types.AttributeValueMemberS{Value: "00"},
				"requestedYear":  &types.AttributeValueMemberS{Value: "0000"},
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
