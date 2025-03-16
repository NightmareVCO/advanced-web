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

type APIGatewayProxyRequest struct {
	Body string `json:"body"`
	Path string `json:"rawPath"`
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

func handleRequest(ctx context.Context, event APIGatewayProxyRequest) (string, error) {
	var ID string = strings.Split(event.Path, "/")[2]

	input := &dynamodb.DeleteItemInput{
		Key: map[string]types.AttributeValue{
			"id": &types.AttributeValueMemberS{Value: ID},
		},
		TableName: &tableName,
	}

	_, err := dynamoDBClient.DeleteItem(ctx, input)
	if err != nil {
		log.Fatalf("failed to delete item: %v", err)
		return "", fmt.Errorf("failed to delete item: %v", err)
	}

	return ID, nil
}

func main() {
	lambda.Start(handleRequest)
}
