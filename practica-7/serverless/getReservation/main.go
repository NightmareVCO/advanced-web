package main

import (
	"context"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type APIGatewayProxyRequest struct {
	Body string `json:"body"`
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

func handleRequest(ctx context.Context, event APIGatewayProxyRequest) (*dynamodb.ScanOutput, error) {
	scanInput := &dynamodb.ScanInput{
		TableName: &tableName,
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
