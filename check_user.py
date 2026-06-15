import sqlite3
import sys
email='s99005623@gmail.com'
conn=sqlite3.connect('fra_atlas.db')
cur=conn.cursor()
cur.execute('SELECT id, email FROM users WHERE email=?',(email,))
row=cur.fetchone()
if row:
    print('FOUND', row)
else:
    print('NOT FOUND')
conn.close()
