#!/bin/bash
set -e

BUCKET_NAME="play.bobspot.org"
DISTRIBUTION_ID=""  # Set this after CloudFormation deployment

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "Warning: DISTRIBUTION_ID not set. Cache invalidation will be skipped."
    echo "Get it from: aws cloudformation describe-stacks --stack-name bobspot-play-website --query \"Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue\" --output text"
fi

# Sync files
echo "Syncing files to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Copy HTML files without extension for clean URLs
echo "Setting up clean URLs for HTML files..."
cd dist
for file in $(find . -name '*.html' | sed 's|^\./||'); do
    aws s3 cp "${file}" "s3://$BUCKET_NAME/${file%.*}" --content-type 'text/html'
done
cd ..

# Invalidate CloudFront cache
if [ -n "$DISTRIBUTION_ID" ]; then
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/*" \
        --query "Invalidation.Id" \
        --output text
    echo "Cache invalidation started."
fi

echo "Upload complete!"
