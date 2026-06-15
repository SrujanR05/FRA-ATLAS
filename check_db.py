import sqlite3, os
print('cwd', os.getcwd())
print('exists', os.path.exists('fra_atlas.db'))
conn=sqlite3.connect('fra_atlas.db')
cur=conn.cursor()
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
print(cur.fetchall())
conn.close()
