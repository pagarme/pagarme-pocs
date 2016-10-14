require 'httparty'
require 'json'

query =  { 
      :api_key => "THE API KEY",
      :amount => "10000",
      "payment_method" => "boleto",
      "split_rules" => [
         {
            :recipient_id => "re_ciql4tcwi013x6z6duqlh9rai",
            :percentage => "10",
            :charge_processing_fee => "true",
            :liable => "true"
          },
          {
            :recipient_id => "re_cipyo22ru008uxe6datwxmp45",
            :percentage => "90",
            :charge_processing_fee => "true",
            :liable => "true"
          }
      ]

}

response = HTTParty.post("https://api.pagar.me/1/transactions", 
                         :body => query.to_json, 
                         :headers => {'Content-type' => 'application/json'})


puts response.body
