import React from "react";
import { NextPage } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { Plan } from "@prisma/client";
import AgencyDetails from "@/components/forms/agency-details";

interface AgencyPageProps {
  // Add your prop types here
  searchParams: {
    plan: Plan;
    state: string;
    code: string;
  };
}

const AgencyPage: NextPage<AgencyPageProps> = async ({
  searchParams: { plan, state, code },
}) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await getAuthUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${plan}`);
      }
      if (state) {
        const statePath = state.split("___")[0];
        const stateAgencyId = state.split("___")[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${code}`);
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not authorized</div>;
    }
  }

  const authUser = await currentUser();
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl mb-4"> Create An Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default AgencyPage;
