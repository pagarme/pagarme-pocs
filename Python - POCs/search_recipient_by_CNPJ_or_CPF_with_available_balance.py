#coding:utf-8
import requests,json

apiKey = {'api_key' : 'SUA_API_KEY'}
ObjectBalance = requests.get('https://api.pagar.me/1/balance',params = apiKey)
ObjectRecipients = requests.get('https://api.pagar.me/1/recipients',params = {'api_key' : apiKey['api_key'],'count' : 100000})

jsonRecipients = json.loads(ObjectRecipients.text)

count = 0

for recipient in jsonRecipients:
	
	Id = recipient['id']
	ObjectBalanceRecipient = requests.get('https://api.pagar.me/1/recipients/{0}/balance'.format(Id),params = apiKey)

	jsonBalanceRecipient = json.loads(ObjectBalanceRecipient.text)

	if(recipient['bank_account']['document_number'] == 'CNPJ OU CPF SEM MASCARA' and jsonBalanceRecipient['available']['amount'] >= 0 ):

		availableAMount = jsonBalanceRecipient['available']['amount']

		print(recipient['id'])
		print(availableAMount)

		count = count + 1

print ("Número de recebedores:", count)
