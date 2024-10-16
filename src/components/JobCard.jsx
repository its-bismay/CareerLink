import { useUser } from '@clerk/clerk-react'
import Usefetch from '@/hooks/Usefetch';
import { Card, CardHeader, CardTitle, CardContent, CardFooter  } from './ui/card';
import { Trash2Icon, MapPinIcon, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { saveJob } from '@/api/apijobs';


const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => {},
}) => {


    const {fn: fnSavedJobs,
        data: savedJobs,
        loading: loadingSavedJobs,
      } = Usefetch(saveJob)

    const {user} = useUser(); 
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">{job.title}
            {isMyJob && <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer'/>}
            </CardTitle>
        </CardHeader>

        <CardContent className="flex-flex-col gap-4 flex-1">
            <div>
                {job.company && <img src={job.company.logo_url} className='h-6'/>}
                <div className='flex gap-2 items-center'>
                    <MapPinIcon size={15} />{job.location}
                </div>
            </div>

            <hr />
                {job.description.substring(0, job.description.indexOf("."))}
        </CardContent>
        <CardFooter className="flex gap-2">
            <Link to={`/job/${job.id}`} className='flex-1'>
            <Button variant="secondary" className="w-full">
                More Details
            </Button>
            </Link>

            <Heart size={20}  stroke='red' fill='red'/>
        </CardFooter>
    </Card>
  )
}

export default JobCard