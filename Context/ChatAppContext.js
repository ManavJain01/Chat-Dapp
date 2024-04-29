import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

//INTERNAL IMPORT
import { CheckIfWalletConnected, connectWallet, connectingWithContract } from '@/Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
  //USESTATE
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setfriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");
  
  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("")
  const [currentUserAddress, setCurrentUserAddress] = useState("")
  
  const router = useRouter();

  //FETCH DATA TIME OF PAGE LOAD
  const fetchData = async()=>{
    try{
      //GET CONTRACT
      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      //GET MY FRIEND LIST
      const friendLists = await contract.getMyFriendList();
      setfriendLists(friendLists);
      //GET ALL APP USER LIST
      const userList = await contract.getAllAppUser();
      setUserLists(userList)
    }catch(error){
      setError("Please Install And Xonnect Your Wallet");
    }
  }

  useEffect(()=>{
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async(friendAddress)=>{
    try{
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    }catch(error){
      setError("Currently You Have no Message")
    }
  };

  //CREATE ACCOUNT
  const createAccount = async({ name, accountAddress })=>{
    try{
      if(name || accountAddress)
        return setError("Name and AccountAddress, cannot be empty")

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();

    }catch(error){
      setError("Error while creating your account, PLease reload browser.")
    }
  }

  //ADD YOUR FRIEND
  const addFriends = async()=>{
    try{
      if(name || accountAddress) return setError("PLease provide contract")
      
    }catch(error){
      setError("Something went wrong while adding friends, try again")
    }
  }

  return(
    <ChatAppContext.Provider value={{ readMessage, createAccount }}>
      {children}
    </ChatAppContext.Provider>
  );
};