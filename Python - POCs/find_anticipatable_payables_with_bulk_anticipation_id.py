#coding:utf-8 
import requests,json

payload = {'api_key' : 'SUA_API_KEY'}

object_payables = requests.get('https://api.pagar.me/1/payables',params = {'api_key' : payload['api_key'],'count' : 100000})

json_payables = json.loads(object_payables.text)

bulk_anticipation_id = 'BULK_ANTICIPATION_ID'

payables_ba = {}

count = 0

for payable in json_payables:

	if payable['bulk_anticipation_id'] != None:
		payables_ba = payable
		if payables_ba['bulk_anticipation_id'] == bulk_anticipation_id:
			print("ID da transacao antecipada", payables_ba['transaction_id'])
			count = count +1
print("total de transacoes antecipadas", count)

print("--------------------------FIM--------------------------------")
