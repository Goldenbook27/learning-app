import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import Cta from "@/components/CTA"
import { Button } from "@/components/ui/button"
import { recentSessions, subjectsColors } from "@/constants"
import React from 'react'
import { getAllCompanions,getRecentSessions } from "@/lib/actions/companion.actions"
import { getSubjectColor } from "@/lib/utils"
import { Suspense } from "react";

const Page = async() => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);


  return (<>
    <div>
        <h1 className="px-6">Popular Companions</h1>
        <section className="home-section py-6">
          <Suspense fallback={<p>Loading companions...</p>}>
          {companions.map((companion)=>(
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
          />
          ))}
          </Suspense>

          
        
        </section>
        <section className="home-section py-6">
          <Suspense fallback={<p>Loading companions list...</p>}>
          <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
          />
          </Suspense>
          <Cta/>
        </section>
    </div>
    </>
  )
}

export default Page