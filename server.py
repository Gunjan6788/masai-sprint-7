import json 
import csv
from flask import Flask
from flask import request
from flask_cors import CORS
import time
import math

app = Flask(__name__)

CORS(app)

###### add item ####
@app.route('/', methods=['POST'])
def add_item():
    name = request.json['name'] 
    item = request.json['item'] 
    price = request.json['price'] 
    quantity = request.json['quantity'] 
    day = request.json['day'] 

    with open('data.csv','r') as file_reader:
        reader = csv.DictReader(file_reader)

        user = []

        for row in reader:
            user.append(row)

        if(len(user)>0):
            last_id = int(user[len(user)-1]['id'])
            new_id = last_id+1
        else:
            new_id = 1
       
    if(len(user)==0):
        header = ['id','name','item','price','quantity','day']
        with open('data.csv','w') as file_writer:
            writer = csv.DictWriter(file_writer,fieldnames=header)
            writer.writeheader()
            writer.writerow({'id':new_id,'name':name,'item':item, 'price':price, 'quantity':quantity,'day':day})
    else:
        header = ['id','name','item','price','quantity','day']
        with open('data.csv','a') as file_writer:
            writer = csv.DictWriter(file_writer,fieldnames=header)
            writer.writerow({'id':new_id,'name':name,'item':item, 'price':price, 'quantity':quantity,'day':day})

        
    return json.dumps({"message":"Item added Successfully"})


######## show Data #######
@app.route('/orders', methods=['POST'])
def show():

    if request.method=="POST":
        user = request.json['user']

        with open('data.csv','r') as file_reader:
            reader = csv.DictReader(file_reader)

            data = []
            for row in reader:
                if row['name'] == user:
                    data.append(row)

        if(len(data)>0):
            return json.dumps({"data":data})
        else:
            return json.dumps({"data":[{"name":"User not exist"}]})
            

####### edit data ###########
@app.route('/edit/<id>', methods=['POST','GET'])
def edit(id):

    if request.method == 'GET':
        with open('data.csv','r') as file_reader:
            reader = csv.DictReader(file_reader)

            for row in reader:
                if row['id'] == id:
                    return json.dumps(row)
                
    else:
        name = request.json['name']
        item = request.json['item']
        price = request.json['price']
        quantity = request.json['quantity']
        day = request.json['day']

        with open('data.csv','r') as file_reader:
            reader = csv.DictReader(file_reader)

            data = []
            for row in reader:
                if row['id'] == id:
                    data.append({'id':id,'name':name,'item':item, 'price':price, 'quantity':quantity,'day':day})
                else:
                    data.append(row)


        header = ['id','name','item','price','quantity','day']
        with open('data.csv','w') as file_writer:
            writer = csv.DictWriter(file_writer,fieldnames=header)
            writer.writeheader()
            writer.writerows(data)

        return json.dumps({"message":"Data Edited successfully"})


###### delete item ###########
@app.route('/orders/<id>', methods=['DELETE'])
def delete(id):
        
    with open('data.csv','r') as file_reader:
        reader = csv.DictReader(file_reader)

        data = []
        next_id = 1
        for row in reader:
            if row['id']!=id:
                row['id'] = next_id
                next_id+=1
                data.append(row)

    header = ['id','name','item','price','quantity','day']
    with open('data.csv','w') as file_writer:
        writer = csv.DictWriter(file_writer,fieldnames=header)
        writer.writeheader()
        writer.writerows(data)
    
    return json.dumps({"message":"data deleted"})


######### Bill Generate #########
@app.route('/bill', methods=['POST'])
def generate_bill():
    locatime = time.asctime( time.localtime(time.time()))
    locatime = locatime.split(' ')

    user = request.json['user']

    data = []

    with open('data.csv','r') as file_reader:
        reader = csv.DictReader(file_reader)

        for row in reader:
            if row['name']==user and row['day']==locatime[0]:
                data.append(row)
                
    amount=0
    day = ''
    for row in data:
        day = row['day']
        amount += int(row['price']) * int(row['quantity'])
    

    tax = int(amount * 5/100) 
    serice_charge = int(amount * 10/100)
    if day=='Mon' or day=='Sun':
        discount = int(amount * 10/100)
        total = amount + tax + serice_charge - discount
    else:
        total = int(amount + tax + serice_charge)
    
    return json.dumps({"data":data,"tax":tax,"amount":amount,"service_charge":serice_charge,"discount":discount,"total":total})

            