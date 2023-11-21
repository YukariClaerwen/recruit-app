
import { getCompanies } from '@/app/api/company/company';
import { getUser } from '@/app/api/user/user';
import Companies from '@/components/client/companies';
import UserList from '@/components/dashboard/UserList';
import React from 'react'

const page = async ({ params }) => {

  // const candidates = await data.tag.candidates;
  // const consultants = await data.tag.consultants;
  // const admins = await data.tag.admins;

  if (params.tag === 'recruiter') {

    const data = await getUser();
    const companies = await getCompanies()
    const recruiters = await data.tag.recruiters;
    
    return (
      <div className="container pt-5 space-y-6">
        <UserList data={recruiters} />
        <div className="mb-5">
        <Companies data={companies}/>
        </div>
      </div>
    )
  }

  if(params.tag === 'admin') {
    const data = await getUser();
    const admins = await data.tag.admins;
    return (
      <div className="container pt-5 space-y-6">
        <UserList data={admins} />
      </div>
    )
  }

  if(params.tag === 'consultant') {
    const data = await getUser();
    const consultants = await data.tag.consultants;
    return (
      <div className="container pt-5 space-y-6">
        <UserList data={consultants} />
      </div>
    )
  }

  if(params.tag === 'candidate') {
    const data = await getUser();
    const candidates = await data.tag.candidates;
    return (
      <div className="container pt-5 space-y-6">
        <UserList data={candidates} />
      </div>
    )
  }



  return (
    <div>{params.tag} page</div>
  )
}

export default page