import React, { useState, useEffect } from 'react';
import { Text, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { readContract } from "@wagmi/core";
import { useContract } from "../ContractContext";
import { TipTutorDialog } from '../dialogs/TipDialog';
import { useToast } from '@chakra-ui/react'
import { CreatePublicationDialog } from '../dialogs/CreatePublicationDialog';

const tutors = [
  {
    id: '1',
    imageUrl: '/matchtutor.svg',
    title: 'Renewable Energy Technologies: A Review',
    rating: 4.5,
    subject: 'The Role of Artificial Intelligence in Healthcare Choose the method that best fits your workflow and expertise level. For small datasets, manual methods like spreadsheet software or text editors may be sufficient,',
    link: 'https//archivix.org/renew'
  },
  {
    id: '2',
    imageUrl: '/matchtutor.svg',
    title: 'Renewable Energy Technologies: A Review',
    rating: 4.5,
    subject: 'The Role of Artificial Intelligence in Healthcare Choose the method that best fits your workflow and expertise level. For small datasets, manual methods like spreadsheet software or text editors may be sufficient,',
    link: 'https//archivix.org/renew'
  },
  {
    id: '3',
    imageUrl: '/matchtutor.svg',
    title: 'Renewable Energy Technologies: A Review',
    rating: 4.5,
    subject: 'The Role of Artificial Intelligence in Healthcare Choose the method that best fits your workflow and expertise level. For small datasets, manual methods like spreadsheet software or text editors may be sufficient,',
    link: 'https//archivix.org/renew'
  },

]

export const MyPublication = () => {
  const toast = useToast()
  const { contractAbi, contractAddress, contract } = useContract();
  const [tutor, setTutor] = useState<any>();


  useEffect(() => {
    // Reading from Contracts
    const fetchResults = async () => {
      try {
        const results = await readContract({
          address: contractAddress,
          abi: contractAbi,
          functionName: "getRegisteredMentors",
          args: [],
        });
        console.log(results);
        setTutor(results);
      } catch (error) {
        console.error("Error fetching tutor data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchResults();
  }, [contractAddress, contractAbi]);

  const [gridItemCount, setGridItemCount] = useState(tutors.length);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIncrement = () => {
    setGridItemCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setGridItemCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const handleDialogOpen = (tutor:any) => {
    // Implement logic to open dialog with tutor's information
    console.log('Dialog opened with tutor:', tutor);
    setSelectedTutor(tutor);
    setIsDialogOpen(true)
  };

  return (
    <section className='font-body-2-body-2 text-xs'>
       <div className="flex-1 flex flex-row items-start justify-between gap-[12px] max-w-full mq450:flex-wrap mx-4">
       <p className='font-extrabold text-3xl text-black1 text-left mb-4'>My Publications</p>
        <CreatePublicationDialog/>
        </div>

      <div className='grid grid-cols-3 justify-evenly gap-8'>
        {tutors.map(tutor => (
          <div key={tutor.id} className="flex flex-col space-y-3  bg-white py-4 px-4 border-2 border-gray-200 rounded-md mt-2 w-80">
            <img src={tutor.imageUrl} className="h-60 w-60 mx-auto" alt="Tutor" />
            <div className="space-y-1">
              <Text color="black" fontWeight={700} className='text-center '>
                {tutor.title}
               
              </Text>
              <Text color="black" fontWeight={500}>
               Abstract: {tutor.subject}
              
              </Text>
              <Text color="blue" fontWeight={500}>
               Research link: {tutor.link}
              
              </Text>

              <hr className='text-gray-900'/>
              <div className='flex space-x-12 justify-center items-center'>
             
            <p className='font-semibold'>
              Raised: 300 BNB
            </p>
            <p className='font-semibold'>
              Total Votes: 15
            </p>
              </div>
              <div className='flex space-x-4 justify-center'>
             <TipTutorDialog/>
              <Button
             onClick={() =>
              toast({
                title: 'Research upvoted.',
                description: "You've successfully upvoted this research.",
                status: 'success',
                duration: 4000,
                isClosable: true,
              })
            }
              className="rounded-md  bg-newbackground px-4 text-white text-sm font-body-2-body-2 font-thin "
            >
             Vote Research
            </Button>
            
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </section>
  );
};

