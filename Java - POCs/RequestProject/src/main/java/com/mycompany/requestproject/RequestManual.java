/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.requestproject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

/**
 *
 * @author jonatasmaxi
 */
public class RequestManual {

    public  String buildJson(String amount, String card_holder_name, String card_expiration_date, String card_number, String card_cvv, String customer_id, String billing_name, String billing_street, String billing_street_number, String billing_complementary, String billing_country, String billing_state, String billing_zipcode, String billing_city, String shipping_name, String shipping_street, String shipping_street_number, String shipping_complementary, String shipping_country, String shipping_state, String shipping_zipcode, String shipping_city, String shipping_fee, String item_id, String item_title, String item_quantity, String item_unit_price, String item_tangible) {
        String json = "{\"api_key\":\"SUA_API_KEY\","
                + "\"amount\":\"" + amount + "\","
                + "\"card_holder_name\":\"" + card_holder_name + "\","
                + "\"card_expiration_date\":\"" + card_expiration_date + "\","
                + "\"card_number\":\"" + card_number + "\","
                + "\"card_cvv\":\"" + card_cvv + "\","
                + "\"customer\":"
                + "     {\"id\":\"" + customer_id + "\"},"
                + "\"billing\":{\"name\":\"" + billing_name + "\",\"address\":{\"street\":\"" + billing_street + "\",\"street_number\":\"" + billing_street_number + "\",\"complementary\":\"" + billing_complementary + "\",\"state\":\"" + billing_state + "\",\"zipcode\":\"" + billing_zipcode + "\",\"country\":\"" + billing_country + "\",\"city\":\"" + billing_city + "\"}},"
                + "\"shipping\":{\"name\":\"" + shipping_name + "\",\"fee\":\"" + shipping_fee + "\",\"address\":{\"street\":\"" + shipping_street + "\",\"street_number\":\"" + shipping_street_number + "\",\"complementary\":\"" + shipping_complementary + "\",\"state\":\"" + shipping_state + "\",\"zipcode\":\"" + shipping_zipcode + "\",\"country\":\"" + shipping_country + "\",\"city\":\"" + shipping_city + "\"}},"
                + "\"items\":[{\"id\":\"" + item_id + "\",\"title\":\"" + item_title + "\",\"quantity\":\"" + item_quantity + "\",\"unit_price\":\"" + item_unit_price + "\",\"tangible\":\"" + item_tangible + "\"}]}";
        return json;
    }

    public  String doRequest(String json) throws IOException {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost("https://api.pagar.me/1/transactions");

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");
        CloseableHttpResponse response = client.execute(httpPost);
        InputStream body = response.getEntity().getContent();
        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();

        String line;
        try {

            br = new BufferedReader(new InputStreamReader(body));
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

        } catch (IOException e) {
            e.printStackTrace();
            client.close();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return (sb.toString());

    }

    public static void main(String[] args) throws IOException {
        String amount = "800";
        String card_holder_name = "Jonatas A Maximiano";
        String card_expiration_date = "0919";
        String card_number = "5162305553854007";
        String card_cvv = "909";
        String customer_id = "831093";
        String billing_name = "Jonatas Maximiano";
        String billing_street = "Rua Major Sertório";
        String billing_street_number = "7";
        String billing_complementary = "B";
        String billing_country = "br";
        String billing_state = "São Paulo";
        String billing_zipcode = "09133180";
        String billing_city = "São Paulo";
        String shipping_name = "Jonatas Maximiano";
        String shipping_street = "Rua Rio Jari";
        String shipping_street_number = "780";
        String shipping_complementary = "A";
        String shipping_country = "br";
        String shipping_state = "São Paulo";
        String shipping_zipcode = "09133180";
        String shipping_city = "Santo André";
        String shipping_fee = "0";
        String item_id = "1235";
        String item_title = "Caderno Azul";
        String item_quantity = "1";
        String item_unit_price = "800";
        String item_tangible = "true";
        RequestManual rm = new RequestManual(); 
        String json = rm.buildJson(amount, card_holder_name, card_expiration_date, card_number, card_cvv, customer_id, billing_name, billing_street, billing_street_number, billing_complementary, billing_country, billing_state, billing_zipcode, billing_city, shipping_name, shipping_street, shipping_street_number, shipping_complementary, shipping_country, shipping_state, shipping_zipcode, shipping_city, shipping_fee, item_id, item_title, item_quantity, item_unit_price, item_tangible);
        String response = rm.doRequest(json);
        System.out.println(response);
    }
}
