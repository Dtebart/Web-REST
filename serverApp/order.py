#coding utf-8

import cherrypy
import json
import os

from serverApp import database
from json import encoder

#-------------------------------------
class Order(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        self.database_obj = database.Database("data\\orders\\")
        self.last_id = self.database_obj.readJSON("id")["id"]
    
    #-------------------------------------
    def index(self, *arglist, **kwargs):
    #-------------------------------------
        if cherrypy.request.method == "POST":
            return self.new()

        if cherrypy.request.method == "GET":
            return self.getOrders()
        
    index.exposed = True

    #-------------------------------------
    def getOrders(self, *args, **kwargs):
    #------------------------------------- 	
        file_list = os.listdir(self.database_obj.rootdir_str)
        order_list = []
        
        for order_file in file_list:
            if order_file.endswith(".json"):
                order_obj = self.database_obj.readJSON(order_file[:-5])
                order_list.append(order_obj)    
        return str(order_list)

    #-------------------------------------
    def new(self, *args, **kwargs):
    #------------------------------------- 
        # Increase next_id value in file
        self.last_id = self.last_id + 1
        id_data = {"id": self.last_id}
        self.database_obj.editFile(id_data, "id")
        
        order_obj = cherrypy.request.body.params
        print(order_obj)
        self.database_obj.insertFile(order_obj, str(self.last_id))
        
        return encoder.JSONEncoder().encode(id_data)        
	
    #-------------------------------------
    def update(self, order_id, *args, **kwargs):
    #-------------------------------------
        cl = cherrypy.request.headers['Content-Length']
        rawbody = cherrypy.request.body.read(int(cl))
        order_obj = json.loads(str(rawbody)[2:-1])    
        
        self.database_obj.editFile(order_obj, str(order_id))
        
        return encoder.JSONEncoder().encode(order_obj)
    
    update.exposed = True
    
    #-------------------------------------
    def delete(self, order_id, *args, **kwargs):
    #-------------------------------------
        self.database_obj.deleteFile(str(cherrypy.request.params["order_id"]))
                
        return "success"
    
    delete.exposed = True
    
    #-------------------------------------
    def __getattr__(self, name):
    #-------------------------------------      		
        try:
            name = int(name)
            cherrypy.request.params["order_id"] = name
            
            if cherrypy.request.method == "PUT":
                return self.update
            elif cherrypy.request.method == "DELETE":
                return self.delete            
        except:
            raise AttributeError("%r object has no attribute %r" % (self.__class__.__name__, name))    