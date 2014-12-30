# coding: utf-8

import os
import json

#-------------------------------------
class Database(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self, rootdir_str):
    #-------------------------------------
        self.rootdir_str = rootdir_str   
        
    #-------------------------------------
    def insertFile(self, userData):
    #-------------------------------------
        json_file = open(self.rootdir_str + str(userData["number"]) + ".json", "w+")
        json.dump(userData, json_file)
        json_file.close()
    
    #-------------------------------------
    def readFile(self, fileName):
    #-------------------------------------
        json_file = open(self.rootdir_str + fileName + ".json", "r+")
        json_str = json_file.read()
        json_obj = json.loads(json_str)
        json_file.close()
                
        return json_obj        
    
    #-------------------------------------
    def editFile(self, userData):
    #-------------------------------------
        json_file = open(self.rootdir_str + userData["id"] + ".json", "w+")
        json.dump(userData, json_file)
        json_file.close()
    
    #-------------------------------------
    def deleteFile(self, userData):
    #-------------------------------------
        os.remove(self.rootdir_str + userData["id"] + ".json")
        