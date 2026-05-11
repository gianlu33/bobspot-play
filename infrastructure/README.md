# Infrastructure Setup for play.bobspot.org

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Route 53 Hosted Zone** for bobspot.org (you likely already have this)
3. **ACM Certificate** for play.bobspot.org in **us-east-1** region (required for CloudFront)

## Step 1: Get your Hosted Zone ID

```bash
aws route53 list-hosted-zones --query "HostedZones[?Name=='bobspot.org.'].Id" --output text
```

## Step 2: Create ACM Certificate (if needed)

CloudFront requires certificates to be in **us-east-1**:

```bash
# Request certificate
aws acm request-certificate \
    --domain-name play.bobspot.org \
    --validation-method DNS \
    --region us-east-1

# Get the certificate ARN and validation CNAME
aws acm describe-certificate \
    --certificate-arn <ARN_FROM_PREVIOUS_COMMAND> \
    --region us-east-1 \
    --query "Certificate.DomainValidationOptions"

# Add the CNAME record to Route 53 for validation
# Or use this command to auto-validate:
aws acm wait certificate-validated \
    --certificate-arn <ARN> \
    --region us-east-1
```

## Step 3: Deploy Infrastructure

Edit `deploy.sh` and set:
- `HOSTED_ZONE_ID` - from Step 1
- `ACM_CERTIFICATE_ARN` - from Step 2

Then run:

```bash
cd infrastructure
chmod +x deploy.sh
./deploy.sh
```

## Step 4: Configure Upload Script

After deployment, get the CloudFront Distribution ID:

```bash
aws cloudformation describe-stacks \
    --stack-name bobspot-play-website \
    --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
    --output text
```

Edit `../upload.sh` and set `DISTRIBUTION_ID`.

## Uploading Content

From the project root:

```bash
npm run build  # or your build command
./upload.sh
```
