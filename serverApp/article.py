# coding utf-8

import cherrypy
import json
import os

from serverApp import database


#-------------------------------------
class Article(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        self.database_obj = database.Database("data\\articles\\")
        
        article1_dict = {"number" : 1, "name" : "HN-Cappy", "price": 3.50}
        article2_dict = {"number" : 2, "name" : "HN-T-Shirt", "price": 7.99}
        article3_dict = {"number" : 3, "name" : "HN-Cup", "price": 2.50}
        
        self.database_obj.insertFile(article1_dict, str(article1_dict["number"]))
        self.database_obj.insertFile(article2_dict, str(article2_dict["number"]))
        self.database_obj.insertFile(article3_dict, str(article3_dict["number"]))
    
    #-------------------------------------
    def index(self):
    #-------------------------------------
        file_list = os.listdir(self.database_obj.rootdir_str)
        article_list = []
        
        for article_file in file_list:
            if article_file.endswith(".json") and not article_file.startswith("detail"):
                article_obj = self.database_obj.readFile(article_file[:-5])
                article_list.append(article_obj)    
        return str(article_list)
    
    index.exposed = True
    
    #-------------------------------------
    def get_article(self, article_id):
    #-------------------------------------
        article_detail_obj = self.database_obj.readFile("detail" + str(article_id))
        
        print(str(article_detail_obj))
        return str(article_detail_obj)
    
    get_article.exposed = True
    
    #-------------------------------------
    def __getattr__(self, name):
    #-------------------------------------
        try:
            name = int(name)
            cherrypy.request.params["article_id"] = name
            return self.get_article            
        except:
            raise AttributeError("%r object has no attribute %r" % (self.__class__.__name__, name))