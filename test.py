lines words calculation
--------------------------------
chars = words = lines = 0
file_name = 'test.txt'
with open(file_name, 'r') as in_file:
    for line in in_file:
        lines += 1
        words += len(line.split())
        chars += len(line)

print chars
print words
print lines

second program
import csv
from operator import itemgetter

sort of csv file by coloumn
--------------------------------------------------------
reader = csv.reader(open("salaries.csv"), delimiter=",")
sortedlist = sorted(reader, key=itemgetter(2), reverse=True)
count = 0
for temp in sortedlist:
    if(count != 0):
        print temp[0],",",temp[2]
    else:
        count+= 1



median
-----------------------------------------
from __future__ import with_statement
filename = "salaries.csv"
import csv
from collections import defaultdict

with open(filename,"r") as f:
    d = defaultdict(list)
    reader = csv.reader(f)
    reader.next()
    for row in reader:
        d[row[1]].append(float(row[2]))   

for k,v in d.iteritems():
    v.sort()
    if(len(v)% 2 == 0):
       final = (v[(len(v)/2)]+v[((len(v)+2)/2)])/2
       if final in v:
           print k, " ", int(final)
       else:
           print k, " ", (v[(len(v)/2)-1]+v[((len(v)+2)/2)-1])/2
    else:
       final1 = v[((len(v)+1)/2)-1]
       print k, " ", (final1)
 stander deviation
-------------------------------------------
from __future__ import with_statement
filename = "salaries.csv"
import csv
import math
from collections import defaultdict

with open(filename,"r") as f:
    d = defaultdict(list)
    reader = csv.reader(f)
    reader.next()
    for row in reader:
        d[row[1]].append(float(row[2]))   

for k,v in d.iteritems():
    if (len(v) != 1):
        num_list = []
        avg1 = int(sum(v)/len(v))
        for temp in v:
            num_list.append(math.pow((temp-avg1),2))
        result = math.sqrt(sum(num_list)/len(num_list))
        print k, " ",int(result)
