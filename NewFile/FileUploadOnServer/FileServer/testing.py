from Tkinter import *
root=Tk()
dict={"a":1,"b":2,"c":3}
def limitSize():
    global x
    value = x.get()
    if len(value) > 2: x.set(value[:4])

def value(event):
  global paramvalue
  for i in paramvalue:
    print "the value of entry is",i.get()

def create(list):
  global strvar,paramvalue,dict,x
  paramvalue=[]
  strvar=[]
  for i in range(len(list)):
    x=StringVar()
    x.trace('w', limitSize)
    label=Label(root,text=list[i])
    label.grid(row=i, column=0)
    entry=Entry(root,width="5",textvariable=x)
    entry.grid(row=i,column=1)
    paramvalue.append(entry)
    strvar.append(x)
    print dict[list[i]]

        
dayValue = StringVar()
dayValue.trace('w', limitSize)
        
day_entry1=Entry(root, bg="#282B2B", width=2, textvariable=dayValue)
day_entry1.grid(row=4,column=0)
send=Button(root,text="send")
send.grid(row=5,column=1)
send.bind("<Button-1>",value)
create(["a","b"])
mainloop()
