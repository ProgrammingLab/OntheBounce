package com.kurume_nct.onthebounce.api;

import android.util.Log;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

/**
 * Created by minto on 2015/07/19.
 */
public class UDPPost {
    InetAddress host;
    int port;

    public UDPPost(String ip,int port){
        try{
            host = InetAddress.getByName(ip);
        }catch(UnknownHostException e){
            Log.d("Exception", e.toString());
        }
        this.port = port;
    }

    //send string by udp
    public void sendMessage(String message){
        try {
            DatagramSocket socket = new DatagramSocket();
            byte[] data = message.getBytes();
            DatagramPacket packet = new DatagramPacket(data, data.length, host, port);
            socket.send(packet);
        }catch (SocketException e) {
            Log.d("Exception", e.toString());
        }catch (IOException e){
            Log.d("Exception", e.toString());
        }
    }
}
