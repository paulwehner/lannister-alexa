rm lannister-alexa.zip 
cd js
zip -r ../lannister-alexa.zip *
cd ..
aws lambda update-function-code --function-name lannister-alexa --zip-file fileb://lannister-alexa.zip --profile paulmedev