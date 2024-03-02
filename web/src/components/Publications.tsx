import React, { useState, useEffect } from 'react';
import { Text, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { readContract } from "@wagmi/core";
import { FundDialog } from '../dialogs/FundDialog';
import { useToast } from '@chakra-ui/react'

const research = [
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
  {
    id: '4',
    imageUrl: '/matchtutor.svg',
    title: 'Renewable Energy Technologies: A Review',
    rating: 4.5,
    subject: 'The Role of Artificial Intelligence in Healthcare Choose the method that best fits your workflow and expertise level. For small datasets, manual methods like spreadsheet software or text editors may be sufficient,',
    link: 'https//archivix.org/renew'
  }
]

export const Publication = () => {
  const toast = useToast()
  const [tutor, setTutor] = useState<any>();


  useEffect(() => {
    // Reading from Contracts
    const fetchResults = async () => {
    
    };

    fetchResults();
  }, []);

  const [gridItemCount, setGridItemCount] = useState(research.length);
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
    <section className='font-body-2-body-2 '>
       <div className="flex-1 flex flex-row items-start justify-between gap-[12px] max-w-full mq450:flex-wrap">
       <p className='font-extrabold text-9xl text-black1 text-left mb-4'>Publications</p>
          <button
            className="cursor-pointer border-none py-2.5 px-3 bg-white rounded-md overflow-hidden flex flex-row items-center justify-end"
            onClick={() => window.location.reload()}
          >
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <img
                className="h-6 w-6 relative"
                alt=""
                src="/vuesaxtwotonestatus.svg"
              />
              <div className="relative text-base leading-[155%] font-medium font-body-2-body-2 text-gray-1 text-left">
                Refresh
              </div>
            </div>
          </button>
        </div>

      <div className='grid grid-cols-3 justify-evenly gap-8'>
        {research.map(tutor => (
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
              <div className='flex space-x-12 justify-center items-center text-black'>
             
            <p className='font-semibold'>
              Raised: 300 BNB
            </p>
            <p className='font-semibold'>
              Total Votes: 15
            </p>
              </div>
              <div className='flex space-x-4 justify-center'>
             <FundDialog/>
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
              className="rounded-md  bg-newbackground hover:bg-black px-4 text-white text-sm font-body-2-body-2 font-thin "
            >
             Vote Research
            </Button>
            
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation buttons Prev & Next */}
      <div className="space-x-3 flex justify-end mt-6 font-medium">
        <Button
          className='font-light text-black'
          colorScheme="blackAlpha"
          size='lg'
          borderRadius={18}
          variant='solid'
          leftIcon={<ChevronLeftIcon boxSize={7} />}
          onClick={handleDecrement}
          disabled={gridItemCount <= 15}
        >
          Previous
        </Button>
        <Button
          className="bg-black hover:bg-black1 font-light text-white"
          size='lg'
          borderRadius={18}
          variant='solid'
          rightIcon={<ChevronRightIcon boxSize={7}/>}
          onClick={handleIncrement}
          disabled={gridItemCount <= 15}
        >
          Next
        </Button>
      </div>
   
    </section>
  );
};

