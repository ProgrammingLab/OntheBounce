package com.kurume_nct.onthebounce.model;

/**
 * Created by minto on 2015/07/19.
 */
public class ModelLocator {
    public ModelLocator locator = new ModelLocator();

    private ModelLocator(){
    }

    public ModelLocator getInstance(){
        return locator;
    }

    public ServerPost getServerPost(){
        return ServerPost.getInstance();
    }
}
