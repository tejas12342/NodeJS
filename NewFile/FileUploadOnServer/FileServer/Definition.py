from Serial_Example import SerLine
from binascii import *
from datetime import datetime
from Tkinter import *
from tkFileDialog   import askopenfilename
from glob import glob
import time

root = Tk()
global initPort
global CommandDict,ParameterValue
initPort=None
CommandDict={}
CommandDict=CommandDict.fromkeys(["TimeInterval","Rejoin","RemoveChildren","RequestType","StartIndex","SourceEndPoint","DestinationEndPoint","AddressMode","GroupCount","OnOff","Level","On/Off/Toggle","TargetEndPoint","DestAddressingMode","Direction","ManufacturerSpecific","Color X","Color Y","Hue","No_PAN","SecurityMode","Radius","DataLength","Data"],2)
CommandDict.update(CommandDict.fromkeys(["ShortAddress","TargetShortAddress","GroupAddress","TransitionTime","NumberOfInputCluster","NumberOfOutputCluster","AttributeID","ManufacturerID","GroupID","SceneID","SceneNameLength","SceneNameMaxLength","ColorTemperature","ProfileID","ClusterID"],4))
CommandDict.update(CommandDict.fromkeys(["ChannelMask"],8))
CommandDict.update(CommandDict.fromkeys(["ExtendedShortAddress","TargetExtendedAddress"],16))

def RemoveLabels():
    list=root.grid_slaves()
    for i in list:
      i.destroy()

def NewFile():
    print "New File!"

def OpenFile():
    name = askopenfilename()
    print name

def About():
    print "This is a simple example of a menu"

def Create_Parameter_Label(FSCI_CMD):
    global ParameterValue,CommandDict
    ParameterValue = []
    for i in range(len(FSCI_CMD)):
        label = Label(root, text=FSCI_CMD[i])
        label.grid(row=i, column=0)
        print "DICT VALUE",CommandDict[FSCI_CMD[i]]
       # entry = Entry(root, width=CommandDict[FSCI_CMD[i]])
        entry = Entry(root, width=16)
        entry.grid(row=i, column=1)
        ParameterValue.append(entry)


def Validation(CommandList):
    global ParameterValue,CommandDict
    FinalStr=""
    for i in range(0,len(ParameterValue)):
       if len(ParameterValue[i].get())>CommandDict[CommandList[i]]:
          output.insert(END,("\n\n"+"<*>"*15+"\nPlease insert %s of %d digit"+"\n"+"<*>"*15)%(CommandList[i],CommandDict[CommandList[i]]))
       elif len(ParameterValue[i].get())<=CommandDict[CommandList[i]]:
          str1=ParameterValue[i].get()   
          FinalStr=FinalStr+("0"*(CommandDict[CommandList[i]]))[:-len(str1)]+str1
          print "FinalStr",FinalStr
       else:
          print "OK"
          continue

    return FinalStr

        
def init_Port(device,baudrate,databits,parity,stopbits,flowcontrol):								# Function to initialize the serial port
	global initPort,setng
        RemoveLabels()
	initPort = SerLine(str(device))# Init the serial port
        output.insert(END,"<*>"*15+"\n Port is Open for serial Communication"+"\n"+"<*>"*15)
	initialize_Port= initPort.open(baudrate,str(databits),str(parity),str(stopbits))					# Open Serial Port
        print initialize_Port

def Send_Receive_Data(data):
	global initPort
        print "Send_Receive_Data_function Data",data
	initPort.writeBytes_Thread(data)				
	time.sleep(1)
	receivedByte = initPort.readBytes()					
	receivedString = b2a_hex((str(receivedByte)))					 
	return receivedString

def Rx_Debug(message):
        tt=datetime.now().strftime("%H:%M:%S")
	output.insert(END,"\n\nRx:")
        msg=(" ".join(message[i:i+2] for i in range(0, len(message), 2)))
	output.insert(END,tt+"> "+msg)
	

def Tx_Debug(message):
        tt=datetime.now().strftime("%H:%M:%S")
	output.insert(END,"\nTx:")
        msg=(" ".join(message[i:i+2] for i in range(0, len(message), 2)))
	output.insert(END,tt+"> "+msg)

def Debug(message):
	output.insert(END,("\n\n"+"*"*5))
	output.insert(END,message)
	output.insert(END,("*"*5))
		

def Help():
	Debug("currentlly help is not available")


def About():
	Debug("This is the Linux based Test Tool GUI")
	
def Send_Command(HexCode=None,message=''):
	Debug(message)
	CheckPermitJoinStatusCommand =unhexlify(HexCode)
	Tx_Debug(b2a_hex(CheckPermitJoinStatusCommand))
	CheckPermitJoinStatusResponse=Send_Receive_Data(CheckPermitJoinStatusCommand) 
	Rx_Debug(CheckPermitJoinStatusResponse)

def Calc_CRC(code):
    CRC=''
    print "THE VALUE",code
    Data_= []

    Data_2 = []
    len_ = len(code)

    for i in xrange(0,len_,2):
        Data_2.append(code[i]+code[i+1])
    Data2 = Data_2[1:]
    init_CRC = 00
    for i in range ((len(Data2))):
             CRC_value = init_CRC  ^ int(Data2[i], 16)
             init_CRC  = CRC_value
                        
    a=(hex(CRC_value))[2:]
    if len(a)==1:
      CRC="0"+a
    else:
      CRC=a
    cmd=code+CRC
    print cmd
    return cmd

def SteerValue(event):
    global Steer
    CmdStr=Validation(Steer)
    Data = "0237490400"+CmdStr
    DataFrame=Calc_CRC(Data+"00")
    Send_Command(DataFrame,"NetworkSteering")
    
def Steer():
    global Steer
    RemoveLabels()
    Steer = ["TargetShortAddress","TimeInterval"]
    Create_Parameter_Label(Steer)
    send=Button(root,text="Send")
    send.grid(row=2,column=0)
    send.bind("<Button-1>",SteerValue)
	
def ChannelValue(event):
    global SetChannel
    CmdStr=Validation(SetChannel)
    Data = "0237210400"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"Set Channel")

def Set_Channel():
   global SetChannel
   RemoveLabels()
   SetChannel=["ChannelMask"]
   Create_Parameter_Label(SetChannel)
   send=Button(root,text="Send")
   send.grid(row=1,column=0)
   send.bind("<Button-1>",ChannelValue)

def ExtendedPanValue(event):
   CmdStr=Validation(["ExtendedShortAddress"])
   Data = "0237200800"+CmdStr
   DataFrame=Calc_CRC(Data)
   Send_Command(DataFrame,"Setting Extended PanID")

def Set_ExtendedPan():
   RemoveLabels()
   Create_Parameter_Label(["ExtendedShortAddress"])
   send=Button(root,text="Send")
   send.grid(row=1,column=0)
   send.bind("<Button-1>",ExtendedPanValue)
   
def MgmtLeaveReq(event):
   global Mgmt_LeaveRequest
   CmdStr=Validation(Mgmt_LeaveRequest)
   Data = "0237470C00"+CmdStr
   DataFrame=Calc_CRC(Data)
   Send_Command(DataFrame,"Management Leave Request")


def Mgmt_LeaveReq():
   RemoveLabels()
   global send,Mgmt_LeaveRequest
   Mgmt_LeaveRequest=["TargetShortAddress","ExtendedShortAddress","Rejoin","RemoveChildren"]
   Create_Parameter_Label(Mgmt_LeaveRequest)
   send=Button(root,text="Send")
   send.grid(row=4,column=0)
   send.bind("<Button-1>",MgmtLeaveReq)

def NwkAddReq(event):
   global NwkAddReq
   CmdStr= Validation(NwkAddReq)
   Data = "0237400C00"+CmdStr
   DataFrame=Calc_CRC(Data)
   Send_Command(DataFrame,"Network Address Request")

def Nwk_Add_Request():
   global NwkAddReq
   RemoveLabels()
   NwkAddReq=["TargetShortAddress","ExtendedShortAddress","RequestType(00/01)","StartIndex"]
   Create_Parameter_Label(NwkAddReq)
   send=Button(root,text="Send")
   send.grid(row=4,column=0)
   send.bind("<Button-1>",NwkAddReq)

def ActEndPtReq(event):
   global ActivePointReq
   CmdStr= Validation(ActivePointReq)
   Data = "0237450200"+CmdStr
   DataFrame=Calc_CRC(Data)
   Send_Command(DataFrame,"ActiveEndPoint Request")

def ActivePointReq():
   global ActivePointReq
   RemoveLabels()
   ActivePointReq=["TargetShortAddress"]
   Create_Parameter_Label(ActivePointReq)
   send=Button(root,text="Send")
   send.grid(row=1,column=0)
   send.bind("<Button-1>",ActEndPtReq)

def MgmtLQI(event):
    global Management_LQI
    CmdStr= Validation(Management_LQI)
    Data = "02374E0300"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"Management LQI Request")

def Management_LQI():
    global Management_LQI
    RemoveLabels()
    Management_LQI=["TargetShortAddress","StartIndex"]
    Create_Parameter_Label(Management_LQI)
    send=Button(root,text="Send")
    send.grid(row=2,column=0)
    send.bind("<Button-1>",MgmtLQI)
 
def SmpReq(event):
    global SmpDescriptor
    CmdStr= Validation(SmpDescriptor)
    Data = "0237430300"+CmdStr
    CmdStr= Validation(SmpDescriptor)
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"Simple Descriptor Request")

def Simple_Descriptor():
    global SmpDescriptor
    RemoveLabels()
    SmpDescriptor=["TargetShortAddress","DestinationEndPoint"]
    Create_Parameter_Label(SmpDescriptor)
    send=Button(root,text="Send")
    send.grid(row=2,column=0)
    send.bind("<Button-1>",SmpReq)

def AdGrp(event):
    global Add_Group
    CmdStr= Validation(Add_Group)
    Data = "0237600700"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"AddGroup")

def Add_Group():
    global send,Add_Group
    RemoveLabels()
    Add_Group=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupAddress"]
    Create_Parameter_Label(Add_Group)
    send=Button(root,text="Send")
    send.grid(row=5,column=0)
    send.bind("<Button-1>",AdGrp)

def VwGrp(event):
    global View_Group
    CmdStr= Validation(View_Group)
    Data = "0237600700"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"ViewGroup")

def View_Group():
    global View_Group
    RemoveLabels()
    View_Group=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupAddress"]
    Create_Parameter_Label(View_Group)
    send=Button(root,text="Send")
    send.grid(row=5,column=0)
    send.bind("<Button-1>",VwGrp)

def GtGrp(event):
    global GetGroup
    CmdStr= Validation(GetGroup)
    Data = "0237620600"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"GetGroupMemberShip")


def Get_Group():
    global GetGroup
    RemoveLabels()
    GetGroup=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupCount"]
    Create_Parameter_Label(GetGroup)
    send=Button(root,text="Send")
    send.grid(row=5,column=0) 
    send.bind("<Button-1>",GtGrp)

def RmGrp(event):
    global RemoveGroup
    CmdStr= Validation(RemoveGroup)
    Data = "0237630700"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"RemoveGroup")

def Remove_Group():
    global RemoveGroup
    RemoveLabels()
    RemoveGroup=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupAddress"]
    Create_Parameter_Label(RemoveGroup)
    send=Button(root,text="Send")
    send.grid(row=5,column=0)
    send.bind("<Button-1>",RmGrp)

def RmAllGrp(event):
    global RemoveAllGroup
    CmdStr= Validation(RemoveAllGroup)
    Data = "0237640500"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"RemoveAllGroup")

def RemoveAll_Group():
    global RemoveAllGroup
    RemoveLabels()
    RemoveAllGroup=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint"]
    Create_Parameter_Label(RemoveAllGroup)
    send=Button(root,text="Send")
    send.grid(row=4,column=0)
    send.bind("<Button-1>",RmAllGrp)

def AdIfId(event):
    global AddIfIdentifyGroup
    CmdStr= Validation(AddIfIdentifyGroup)
    Data = "0237650700"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"Add If Identfy Group")

def AddIfIdentify_Group():
    global AddIfIdentifyGroup
    RemoveLabels()
    AddIfIdentifyGroup=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupAddress"]
    Create_Parameter_Label(AddIfIdentifyGroup)
    send=Button(root,text="Send")
    send.grid(row=5,column=0)
    send.bind("<Button-1>",AdIfId)

def LvlCntrl(event):
    global LevelControl
    CmdStr= Validation(LevelControl)
    Data = "0237810900"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"LevelControl")

def Level_Control():
    global LevelControl
    RemoveLabels()
    LevelControl=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","OnOff","Level","TransitionTime"]
    Create_Parameter_Label(LevelControl)
    send=Button(root,text="Send")
    send.grid(row=7,column=0)
    send.bind("<Button-1>",LvlCntrl)
   
def OnOff(event):
    global OnOff_
    CmdStr= Validation(OnOff_)
    Data = "0237920600"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"OnOffCommand")

def On_Off():
    global OnOff_
    RemoveLabels()
    OnOff_=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","On/Off/Toggle"]
    Create_Parameter_Label(OnOff_)
    send=Button(root,text="Send")
    send.grid(row=5,column=0)
    send.bind("<Button-1>",OnOff)

def Raw_APSData_Req(event):
    global RawData
    CmdStr= Validation(RawData)
    Data = "023C300C00"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"RawAPSDataRequest")

def RawAPSDataReq():
    global RawData
    RemoveLabels()
    RawData=["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","ProfileID","ClusterID","SecurityMode","Radius","DataLength","Data"]
    Create_Parameter_Label(RawData)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",Raw_APSData_Req)

def setngL():
    global t1,e1,t2,e2,t3,e3,t4,e4,t5,e5,send,cancel
    RemoveLabels()
    t1=Label(root,text="Baud Rate")
    t1.grid(row=0,column=0)
    e1=Entry(root)
    e1.grid(row=0,column=1)
    t2=Label(root,text="Data Bits")
    t2.grid(row=1,column=0)
    e2=Entry(root)
    e2.grid(row=1,column=1)
    t3=Label(root,text="Parity")
    t3.grid(row=2,column=0)
    e3=Entry(root)
    e3.grid(row=2,column=1)
    t4=Label(root,text="Stop Bits")
    t4.grid(row=3,column=0)
    e4=Entry(root)
    e4.grid(row=3,column=1)
    t5=Label(root,text="Flow Control")
    t5.grid(row=4,column=0)
    e5=Entry(root)
    e5.grid(row=4,column=1)
    send=Button(root,text="Open")
    send.grid(row=5,column=0)
    cancel=Button(root,text="Cancel")
    cancel.grid(row=5,column=2)

def CancelSetting(event):
    list=root.grid_slaves()
    for i in list:
      i.destroy()

def Deviceopen(event,port):
    init_Port(port,e1.get(),e2.get(),e3.get(),e4.get(),e5.get())

def ComportSet(port):
    global comport,setng,send,cancel,e1,e2,e3,e4,e5
    print port
    setngL()
    send.bind("<Button-1>",lambda event,board=port:Deviceopen(event,board))
    cancel.bind("<Button-1>",CancelSetting)
   
def testNumberOfInputClisters(inStr,i,acttyp):
    global t4,e4
#     print ">>", inStr
#     print ">>", i
#     print ">>", acttyp
    ind=int(i)

    if acttyp == '1': #insert
        if inStr[ind] != "0":
            print "Add Entry"
            t4 = Label(root, text="InputClusterList")
            t4.grid(row=4,column=0)
            e4=Entry(root)
            e4.grid(row=4,column=1)
            return True
    return True 

def testNumberOfOutputClisters(inStr,i,acttyp):
    global t6,e6
#     print ">>", inStr
#     print ">>", i
#     print ">>", acttyp
    ind=int(i)

    if acttyp == '1': #insert
        if inStr[ind] != "0":
            print "Add Entry"
            t6 = Label(root, text="OutputClusterList")
            t6.grid(row=6,column=0)
            e6=Entry(root)
            e6.grid(row=6,column=1)
            return True
    return True

def SendMatchDescriptor(event):
    global t1,e1,t2,e2,t3,e3,t4,e4,t5,e5,t6,e6,MatchDescriptorParameter 
    CmdStr=Validation(MatchDescriptorParameter ) 
    Data = "0237460A00"+CmdStr
    Data = Data+e3.get()+e4.get()+e5.get()+e6.get()
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"MatchDescriptor.Request")

   
def MatchDescriptor():
    global t3,e3,t5,e5,MatchDescriptorParameter 
    RemoveLabels()
    MatchDescriptorParameter = ["TargetShortAddress","ProfileID"]
    Create_Parameter_Label(MatchDescriptorParameter)
    t3 = Label(root, text="NumberOfInputClisters")
    t3.grid(row=3,column=0)
    e3=Entry(root,validate="key")
    e3['validatecommand'] = (e3.register(testNumberOfInputClisters),'%P','%i','%d')
    e3.grid(row=3,column=1)
    t5 = Label(root, text="NumberOfOutputClisters")
    t5.grid(row=5,column=0)
    e5=Entry(root,validate="key")
    e5['validatecommand'] = (e5.register(testNumberOfOutputClisters),'%P','%i','%d')
    e5.grid(row=5,column=1)
    send=Button(root,text="Send")
    send.grid(row=15,column=0)
    send.bind("<Button-1>",SendMatchDescriptor)


def SendIEEEAddress(event):    
    global IEEEAddressParameter 
    CmdStr=Validation(IEEEAddressParameter)
    Data = "0237410600"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"SendIEEEAddress.Request")


def IEEEAddress():
    global t1,e1,t2,e2,t3,e3,t4,e4,IEEEAddressParameter 
    RemoveLabels()
    IEEEAddressParameter = ["TargetShortAddress","ShortAddress","RequestType","StartIndex"]
    Create_Parameter_Label(IEEEAddressParameter)
    send=Button(root,text="Send")
    send.grid(row=6,column=0)
    send.bind("<Button-1>",SendIEEEAddress)
    
def SendBind(event):
    global BindParameter 
    CmdStr=Validation(BindParameter)
    Data = "0237300D00"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"Bind")
        
        
def Bind():
    global BindParameter 
    RemoveLabels()
    BindParameter = ["TargetExtendedAddress","TargetEndPoint","ClusterID","DestAddressingMode","DestinationEndPoint"]
    Create_Parameter_Label(BindParameter)
    send=Button(root,text="Send")
    send.grid(row=7,column=0)
    send.bind("<Button-1>",SendBind)


def SendUnBind(event):
    global UnBindParameter 
    CmdStr=Validation(UnBindParameter)
    Data = "0237310D00"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"UnBind")

def UnBind():
    global UnBindParameter 
    RemoveLabels()
    UnBindParameter = ["TargetExtendedAddress","TargetEndPoint","ClusterID","DestAddressingMode","No_PAN","DestinationEndPoint"]
    Create_Parameter_Label(UnBindParameter)
    send=Button(root,text="Send")
    send.grid(row=7,column=0)
    send.bind("<Button-1>",SendUnBind) 
       
def testVal(inStr,i,acttyp):
    global t11,e11
    ind=int(i)

    if acttyp == '1': #insert
        if inStr[ind] != "0":
            print "Add Entry"
            t11 = Label(root, text="ClusterList")
            t11.grid(row=10,column=0)
            e11=Entry(root)
            e11.grid(row=10,column=1)

            return True
             
    return True    
    
def EntireProfile_Common():
    global t10,e10
    t10 = Label(root, text="NumberOFAttributes")
    t10.grid(row=9,column=0)
    e10=Entry(root,validate="key")
    e10['validatecommand'] = (e10.register(testVal),'%P','%i','%d')
    e10.grid(row=9,column=1)
    
 
def SendAttributeDiscoveryRequest(event):
    global e10,e11,AttributeDiscoveryParameter 
    CmdStr=Validation(AttributeDiscoveryParameter)
    Data = "0238400E00"+CmdStr
    Data = Data+e10.get()+e11.get()
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"AttributeDiscovery.Request")
       
    
def AttributeDiscovery():
    global AttributeDiscoveryParameter 
    RemoveLabels()
    EntireProfile_Common()
    AttributeDiscoveryParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","ClusterID","AttributeID","Direction","ManufacturerSpecific","ManufacturerID",]
    Create_Parameter_Label(AttributeDiscoveryParameter)
    send=Button(root,text="Send")
    send.grid(row=12,column=0)
    send.bind("<Button-1>",SendAttributeDiscoveryRequest)
    
def SendConfigureReportingRequest(event):       
    global e10,e11,ConfigureReportingParameter 
    CmdStr=Validation(ConfigureReportingParameter) 
    Data = "0238200C00"+CmdStr
    Data = Data+e10.get()+e11.get()
    print Data
    DataFrame=Calc_CRC(Data)
    print DataFrame
    Send_Command(DataFrame,"ConfigureReporting.Request")
    
def ConfigureReporting():
    global t1,e1,t2,e2,t3,e3,t4,e4,t5,e5,t6,e6,t7,e7,t8,e8,t9,e9,ConfigureReportingParameter 
    RemoveLabels()
    EntireProfile_Common()
    ConfigureReportingParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","ClusterID","Direction","ManufacturerSpecific","ManufacturerID",]
    Create_Parameter_Label(ConfigureReportingParameter)
    send=Button(root,text="Send")
    send.grid(row=12,column=0)
    send.bind("<Button-1>",SendConfigureReportingRequest)

def SendReadAttributeRequest(event):
    global ReadAttributeParameter,e10,e11
    CmdStr= Validation(ReadAttributeParameter)
    Data = "0238000E00"+CmdStr
    DataFrame=Calc_CRC(Data+e10.get()+e11.get())
    Send_Command(DataFrame,"ReadAttribute.Request")
    
def ReadAttribute():
    global ReadAttributeParameter
    RemoveLabels()
    ReadAttributeParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","ClusterID","Direction","ManufacturerSpecific","ManufacturerID"]
    Create_Parameter_Label(ReadAttributeParameter)
    send=Button(root,text="Send")
    send.grid(row=12,column=0)
    send.bind("<Button-1>",SendReadAttributeRequest)
    
def SendWriteAttributeRequest(event):
    global WriteAttributeParameter,e10,e11 
    CmdStr= Validation(WriteAttributeParameter )
    Data = "0238100E00"+CmdStr
    DataFrame=Calc_CRC(Data+e10.get()+e11.get())
    Send_Command(DataFrame,"WriteAttribute.Request")
       
    
def WriteAttribute():
    global WriteAttributeParameter 
    RemoveLabels()
    WriteAttributeParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","ClusterID","Direction","ManufacturerSpecific","ManufacturerID",]
    Create_Parameter_Label(ReadAttributeParameter)
    send=Button(root,text="Send")
    send.grid(row=12,column=0)
    send.bind("<Button-1>",SendWriteAttributeRequest)
    
    

def SendIdentifySendRequest(event):
    global IdentifySendParameter 
    CmdStr= Validation(IdentifySendParameter)
    Data = "0237700700"+CmdStr
    DataFrame=Calc_CRC(Data)
    print DataFrame
    Send_Command(DataFrame,"IdentifySend")       


def IdentifySend():  
    global IdentifySendParameter 
    RemoveLabels()
    IdentifySendParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","TimeoutInSeconds"]
    Create_Parameter_Label(IdentifySendParameter)
    send=Button(root,text="Send")
    send.grid(row=6,column=0)
    send.bind("<Button-1>",SendIdentifySendRequest)
    
def SendIdentifyQueryRequest(event):
    global IdentifyQueryParameter 
    CmdStr= Validation(IdentifyQueryParameter)
    Data = "0237710500"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"IdentifyQuery")
      
def IdentifyQuery():
    global IdentifyQueryParameter 
    RemoveLabels()
    IdentifyQueryParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint"]
    Create_Parameter_Label(IdentifyQueryParameter)
    send=Button(root,text="Send")
    send.grid(row=5,column=0)
    send.bind("<Button-1>",SendIdentifyQueryRequest)
    
def SendMoveToColor(event):
    global MoveToColorParameter 
    CmdStr= Validation(MoveToColorParameter)
    Data = "0237B70B00"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"MoveToColor")
    
def MoveToColor():
    global MoveToColorParameter  
    RemoveLabels()
    MoveToColorParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","Color X","Color Y","TransitionTime"]
    Create_Parameter_Label(MoveToColorParameter)
    send=Button(root,text="Send")
    send.grid(row=8,column=0)
    send.bind("<Button-1>",SendMoveToColor)
    
    
    

def SendMoveToColorTemperature(event):
    global MoveToColorTemperatureParameter 
    CmdStr= Validation(MoveToColorTemperatureParameter)
    Data = "0237C00900"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"MoveToColorTemperature")
    
def MoveToColorTemperature():
    global MoveToColorTemperatureParameter 
    RemoveLabels()
    MoveToColorTemperatureParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","ColorTemperature","TransitionTime"]
    Create_Parameter_Label(MoveToColorTemperatureParameter)
    send=Button(root,text="Send")
    send.grid(row=7,column=0)
    send.bind("<Button-1>",SendMoveToColorTemperature)

def SendMoveToHue(event):
    global MoveToHueParameter 
    CmdStr= Validation(MoveToHueParameter )
    Data = "0237B00900"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"MoveToHue")
    
def MoveToHue():
    global MoveToHueParameter 
    RemoveLabels()
    MoveToHueParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","Hue","Direction","TransitionTime"]
    Create_Parameter_Label(MoveToHueParameter)
    send=Button(root,text="Send")
    send.grid(row=8,column=0)
    send.bind("<Button-1>",SendMoveToHue)


def SendAddScene(event):
    global AddSceneParameter 
    CmdStr= Validation(AddSceneParameter)
    Data = "0237A10E00"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"AddScene")
    
def AddScene():
    global AddSceneParameter 
    RemoveLabels()
    AddSceneParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID","SceneID","TransitionTime","SceneNameLength","SceneNameMaxLength"]
    Create_Parameter_Label(AddSceneParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendAddScene)
    
def SendRecallScene(event):
    global RecallSceneParameter 
    CmdStr= Validation(RecallSceneParameter)
    Data = "0237A50800"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"RecallScene")

def RecallScene():
    global RecallSceneParameter 
    RemoveLabels()
    RecallSceneParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID","SceneID"]
    Create_Parameter_Label(RecallSceneParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendRecallScene)
    
def SendRemoveAllScene(event):
    global RemoveAllSceneParameter 
    CmdStr= Validation(RemoveAllSceneParameter)
    Data = "0237A30700"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"RemoveAllScene")
    
def RemoveAllScene():
    global RemoveAllSceneParameter 
    RemoveLabels()
    RemoveAllSceneParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID"]
    Create_Parameter_Label(RemoveAllSceneParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendRemoveAllScene)
  
def SendRemoveScene(event):
    global RemoveSceneParameter 
    CmdStr= Validation(RemoveSceneParameter)
    Data = "0237A20800"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"RemoveScene")
    
def RemoveScene():
    global RemoveSceneParameter 
    RemoveLabels()
    RemoveSceneParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID","SceneID"]
    Create_Parameter_Label(RemoveSceneParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendRemoveScene)  
    
    
def SendSceneMembership(event):
    global SceneMembershipParameter 
    CmdStr= Validation(SceneMembershipParameter)
    Data = "0237A60700"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"SceneMembership")
    
    
def SceneMembership():
    global SceneMembershipParameter 
    RemoveLabels()
    SceneMembershipParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID"]
    Create_Parameter_Label(SceneMembershipParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendSceneMembership)

def SendStoreScene(event):    
    global StoreSceneParameter 
    CmdStr= Validation(StoreSceneParameter)
    Data = "0237A40800"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"StoreScene")
    
def StoreScene():    
    global StoreSceneParameter 
    RemoveLabels()
    StoreSceneParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID","SceneID"]
    Create_Parameter_Label(StoreSceneParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendStoreScene)
    
def SendViewScene(event):
    global ViewSceneParameter 
    CmdStr= Validation(ViewSceneParameter)
    Data = "0237A00800"+CmdStr
    DataFrame=Calc_CRC(Data)
    Send_Command(DataFrame,"ViewScene")
    
def ViewScene():
    global ViewSceneParameter 
    RemoveLabels()
    ViewSceneParameter = ["AddressMode","TargetShortAddress","SourceEndPoint","DestinationEndPoint","GroupID","SceneID"]
    Create_Parameter_Label(ViewSceneParameter)
    send=Button(root,text="Send")
    send.grid(row=10,column=0)
    send.bind("<Button-1>",SendViewScene)
def ClearText(event):
    output.delete('1.0',END)
def ClosePort(event):
    global initPort
    if initPort!=None:
      output.insert(END,"<*>"*15+"\nPort is Close"+"\n"+"<*>"*15)
      closePort=initPort.close()    
    else:
      output.insert(END,"<*>"*15+"\nNo Port is Open"+"\n"+"<*>"*15)
      
output = Text(root)
output.place(relx=1.0,x=-550,height=850,width=550)

