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
    def readFile(self, fileName):
    #-------------------------------------
        file_obj = open(self.rootdir_str + fileName, "r+")
        fileContent_str = file_obj.read()
        file_obj.close()
        
        return fileContent_str
        
    #-------------------------------------
    def insertFile(self, userData, fileName):
    #-------------------------------------
        json_file = open(self.rootdir_str + fileName + ".json", "w+")
        json.dump(userData, json_file)
        json_file.close()
        
    #-------------------------------------
    def readJSON(self, fileName):
    #-------------------------------------
        json_file = open(self.rootdir_str + fileName + ".json", "r+")
        json_str = json_file.read()
        json_obj = json.loads(json_str)
        json_file.close()
                
        return json_obj        
    
    #-------------------------------------
    def editFile(self, userData, fileName):
    #-------------------------------------
        json_file = open(self.rootdir_str + fileName + ".json", "w+")
        json.dump(userData, json_file)
        json_file.close()
    
    #-------------------------------------
    def deleteFile(self, fileName):
    #-------------------------------------
        os.remove(self.rootdir_str + fileName + ".json")
        