jQuery(function($)
{
	var PaymentButton = $("#pay-button");

	PaymentButton.click(function()
	{
		var checkout = new PagarMeCheckout.Checkout(
		{
			"encryption_key" : "ek_test_88XTnIhTUmWZ28X9Zh364A1KKOl6y0",
			success: function (data)
			{
				console.log(data);
			}
		});

		var params =
		{
			"amount"						: "1000",
			"customerData"					: "true",
			"createToken"					: "false",
			"customerName"					: "Name",
			"customerDocumentNumber"		: "43591017833",
			"customerEmail"					: "potynho@hotmail.com",
			"customerAddressStreet"			: "AddressStreet",
			"customerAddressStreetNumber"	: "123",
			"customerAddressComplementary"	: "AddressComplementary",
			"customerAddressNeighborhood"	: "AddressNeighborhood",
			"customerAddressCity"			: "AddressCity",
			"customerAddress"				: "Address",
			"customerAddressZipcode"		: "13223030",
			"customerPhoneDdd"				: "11",
			"customerPhoneNumber"			: "23456789",
			"paymentMethods"				: "credit_card",
			"boletoExpirationDate"			: "2016-09-25T03:00:00.349Z",
			"interestRate"					: 10
		};

		checkout.open(params);
	});
});