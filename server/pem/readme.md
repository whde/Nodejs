 openssl
genrsa -out rsa_private_key.pem 2048 
rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
