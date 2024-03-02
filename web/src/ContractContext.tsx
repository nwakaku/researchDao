import React, { createContext, useContext, ReactNode } from "react";
import { getContract, getWalletClient } from "@wagmi/core";
import contractStuff from "./abi.json";

// Define the contract context type
interface ContractContextType {
  contractAbi: any[]; // Update with the actual type of your contractAbi
  contractAddress: any;
  contract: any | null; // Update with the actual type of your contract
}

// Create a context with default values
const ContractContext = createContext<ContractContextType>({
  contractAbi: [],
  contractAddress: "",
  contract: null,
});

// Custom hook to use the context
export const useContract = () => useContext(ContractContext);

// Context provider component
interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({
  children,
}) => {
  const contractAbi = contractStuff;
  const contractAddress = "0xb8502Ee266DcC20390D8C15AB24E9bBd966e0568";
  const walletClient = getWalletClient();

  // Create the contract instance
  const contract = getContract({
    address: contractAddress,
    abi: contractAbi,
    walletClient,
  });

  // Create the context value
  const contextValue: ContractContextType = {
    contractAbi,
    contractAddress,
    contract,
  };

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  );
};
