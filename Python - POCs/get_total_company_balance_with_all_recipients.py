import requests,json

apiKey = {'api_key' : 'SUA_API_KEY'}
ObjectBalance = requests.get('https://api.pagar.me/1/balance',params = apiKey)
ObjectRecipients = requests.get('https://api.pagar.me/1/recipients',params = {'api_key' : apiKey['api_key'],'count' : 10000})

jsonRecipients = json.loads(ObjectRecipients.text)

balanceJson = json.loads(ObjectBalance.text)

amount = balanceJson['available']['amount']

available = 0
count = 0
waiting_funds = 0 

for recipient in jsonRecipients:
	
	Id = recipient['id']
	ObjectBalanceRecipient = requests.get('https://api.pagar.me/1/recipients/{0}/balance'.format(Id),params = apiKey)
	jsonBalanceRecipient = json.loads(ObjectBalanceRecipient.text)
	availableAMount = jsonBalanceRecipient['available']['amount']
	waitingFunds = jsonBalanceRecipient['waiting_funds']['amount']
	waiting_funds = waiting_funds + waitingFunds
	available = available + availableAMount
	count = count + 1


print("Saldo a receber" , waiting_funds)
print ("Saldo disponível", available)
print ("Número de recebedores:", count)