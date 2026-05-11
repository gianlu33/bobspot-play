#!/bin/bash
set -e

STACK_NAME="bobspot-play-website"
TEMPLATE_FILE="cloudformation.yaml"
REGION="eu-central-1"  # Change to your preferred region

# These values need to be set before running
HOSTED_ZONE_ID="Z00607592T7WP7K64N0IO"  # Your Route 53 hosted zone ID for bobspot.org
ACM_CERTIFICATE_ARN="arn:aws:acm:us-east-1:550308433467:certificate/218c0139-60a1-464b-8c2f-c875ebd4d616"  # ACM certificate ARN (must be in us-east-1 for CloudFront)

if [ -z "$HOSTED_ZONE_ID" ] || [ -z "$ACM_CERTIFICATE_ARN" ]; then
    echo "Error: Please set HOSTED_ZONE_ID and ACM_CERTIFICATE_ARN in this script"
    echo ""
    echo "To find your Hosted Zone ID:"
    echo "  aws route53 list-hosted-zones --query \"HostedZones[?Name=='bobspot.org.'].Id\" --output text"
    echo ""
    echo "To create/find your ACM certificate (must be in us-east-1 for CloudFront):"
    echo "  aws acm list-certificates --region us-east-1"
    echo "  # Or create one:"
    echo "  aws acm request-certificate --domain-name play.bobspot.org --validation-method DNS --region us-east-1"
    exit 1
fi

echo "Deploying CloudFormation stack: $STACK_NAME"

aws cloudformation deploy \
    --stack-name "$STACK_NAME" \
    --template-file "$TEMPLATE_FILE" \
    --parameter-overrides \
        HostedZoneId="$HOSTED_ZONE_ID" \
        AcmCertificateArn="$ACM_CERTIFICATE_ARN" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM

echo ""
echo "Stack deployed successfully!"
echo ""
echo "Outputs:"
aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs" \
    --output table
