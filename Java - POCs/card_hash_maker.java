package pagar.me.cardhash2;

import android.util.Base64;

import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

/**
 * Created by henriquekano on 15/12/2016.
 */

public class CardHashMaker {

    public static String ENC_KEY = "SUA ENCRYPTION_KEY";
    public static String makeCardHash(String cardNumber, String cardHolderName, String cardExpirationDate, String cardCvv){

        final String queryString = String.format("card_number=%s&card_holder_name=%s&card_expiration_date=%s&card_cvv=%s", cardNumber, cardHolderName, cardExpirationDate, cardCvv);
        try{
            final JSONObject responseCardHashKey = request();
            final String publicKey = responseCardHashKey.get("public_key").toString();
            final String id = responseCardHashKey.get("id").toString();
            final PublicKey pubKey = stringToPublicKey(publicKey);
            final byte[] encrypted = encrypt(queryString, pubKey);
            final String cardHash = formatCardHash(id, encrypted);
            return cardHash;
        }catch(NoSuchAlgorithmException e){
            e.printStackTrace();
        }catch(NoSuchPaddingException e){
            e.printStackTrace();
        }catch(InvalidKeySpecException e){
            e.printStackTrace();
        }catch(InvalidKeyException e){
            e.printStackTrace();
        }catch(BadPaddingException e){
            e.printStackTrace();
        }catch(IllegalBlockSizeException e){
            e.printStackTrace();
        }catch(Exception e){
            e.printStackTrace();
        }

        return null;
    }

    private static PublicKey stringToPublicKey(String keyString) throws NoSuchAlgorithmException, InvalidKeySpecException{
        //String to public key
        String formattedPublicKey = keyString
                .replace("-----BEGIN PUBLIC KEY-----", "")
                .replace("-----END PUBLIC KEY-----", "")
                .replaceAll("\n", "");
        byte[] publicKeyBytes = Base64.decode(formattedPublicKey, 0);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(publicKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey pubKey = keyFactory.generatePublic(keySpec);
        return pubKey;
    }

    private static byte[] encrypt(String string, PublicKey pubKey) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException{
        final Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, pubKey);
        final byte[] encrypted = cipher.doFinal(string.getBytes());
        return encrypted;
    }

    private static String formatCardHash(String id, byte[] encrypted){
        final String encryptedString = Base64.encodeToString(encrypted, 0);
        final String cardHash = String.format("%s_%s", id, encryptedString);
        return cardHash.replaceAll("\n", "");
    }

    private static JSONObject request() throws IOException {
        URL url = null;
        HttpURLConnection urlConnection = null;
        InputStream in = null;
        try {
            url = new URL("https://api.pagar.me/1/transactions/card_hash_key?encryption_key=" + ENC_KEY);
            urlConnection = (HttpURLConnection) url.openConnection();
            in = new BufferedInputStream(urlConnection.getInputStream());
            String response = readStream(in);
            JSONObject jsonObject = new JSONObject(response);
            return jsonObject;
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }  catch(JSONException e){
            e.printStackTrace();
            return null;
        }finally{
            if(urlConnection != null){
                urlConnection.disconnect();
            }
            if(in != null){
                in.close();
            }
        }
    }

    private static String readStream(InputStream stream) throws IOException{
        InputStreamReader isReader = new InputStreamReader(stream);
        BufferedReader reader = new BufferedReader(isReader);
        try{
            StringBuilder stringBuilder = new StringBuilder();
            String nextLine = "";
            while(nextLine != null){
                stringBuilder.append(nextLine);
                nextLine = reader.readLine();
            }
            return stringBuilder.toString();
        }catch(IOException e){
            throw e;
        } finally {
            if(isReader != null){
                isReader.close();
            }
            if(reader != null){
                reader.close();
            }
        }
    }
}
