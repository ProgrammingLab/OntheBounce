package com.kurume_nct.onthebounce.model;

import com.kurume_nct.onthebounce.api.UDPPost;

import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Vector;

/**
 * Created by minto on 2015/07/19.
 */
public class ServerPost extends Thread implements Model{
    static private ServerPost udp_server = new ServerPost();


    UDPPost post;

    //text sending to server
    private Queue<String> messages;

    private ServerPost(){
        messages = new ArrayDeque<>();
    }

    static public ServerPost getInstance(){
        return udp_server;
    }

    public void addMessage(String message){
        this.messages.add(message);
    }

    /**
     * send data to server.
     * if thread is running or messages is empty,
     * this method do nothing.
    */
    public void send(){
        if(!this.isAlive() && !this.messages.isEmpty()) {
            this.run();
        }
    }

    public void run(){
        String message = this.messages.poll();
        post.sendMessage(message);
    }
}
