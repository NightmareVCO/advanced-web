package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/google/uuid"
)

type Student struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type LaboratoryReservation struct {
	ID             string  `json:"id" dynamodbav:"id"`
	LabName        string  `json:"labName" dynamodbav:"labName"`
	RequestedDay   string  `json:"requestedDay" dynamodbav:"requestedDay"`
	RequestedMonth string  `json:"requestedMonth" dynamodbav:"requestedMonth"`
	RequestedYear  string  `json:"requestedYear" dynamodbav:"requestedYear"`
	RequestedHour  string  `json:"requestedHour" dynamodbav:"requestedHour"`
	Student        Student `json:"student" dynamodbav:"student"`
}

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

func handleRequest(ctx context.Context, event APIGatewayProxyRequest) (string, error) {
	var reservation LaboratoryReservation
	err := json.Unmarshal([]byte(event.Body), &reservation)
	if err != nil {
		log.Fatalf("failed to decode request: %v", err)
		return "", fmt.Errorf("failed to decode request: %v", err)
	}
	id := uuid.New().String()
	reservation.ID = id

	log.Printf("reservation: %v", reservation)

	item, err := attributevalue.MarshalMap(reservation)
	if err != nil {
		log.Fatalf("failed to marshal map: %v", err)
		return "", fmt.Errorf("failed to marshal map: %v", err)
	}

	input := &dynamodb.PutItemInput{
		TableName: &tableName,
		Item:      item,
	}

	_, err = dynamoDBClient.PutItem(ctx, input)
	if err != nil {
		log.Fatalf("failed to put item: %v", err)
		return "", fmt.Errorf("failed to put item: %v", err)
	}

	return id, nil
}

func main() {
	lambda.Start(handleRequest)
}
