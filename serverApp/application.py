# coding: utf-8

import cherrypy
import json
import os

from serverApp import template
from serverApp import article
from serverApp import consumerbasket
from serverApp import customer
from serverApp import order
from serverApp import admin

#-------------------------------------
class Application_cl(object):
#-------------------------------------
    
    #-------------------------------------
    def __init__(self):
    #-------------------------------------
        # constructor
        self.template = template.Template()
        self.article = article.Article()
        self.consumerbasket = consumerbasket.Consumerbasket()
        self.customer = customer.Customer()
        self.order = order.Order()
        self.admin = admin.Admin()
    
    #-------------------------------------
    def default(self, *arglist, **kwargs):
    #-------------------------------------
        # Return an error message
        msg_s = "unbekannte Anforderung: " + \
              str(arglist) + \
              ' ' + \
              str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)
    
    default.exposed = True


# EOF
            