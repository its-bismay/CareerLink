import supabaseClient from "@/utils/supabase";

export async function getjobs (token, { location, company_id, serachQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, company:companies(name,logo_url)");

    if (location) {
        query = query.eq("location", location)
    }

    if (company_id) {
        query = query.eq("company_id", company_id)
    }

    if (serachQuery) {
        query = query.ilike("title", `%${serachQuery}%`)
    }

    const { data, error} = await query

    if (error) {
        console.error("Error fetching jobs:", error);
        return null;
    }


    return data;
}



export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job: jobs(*, company: companies(name,logo_url))");
  
    if (error) {
      console.error("Error fetching Saved Jobs:", error);
      return null;
    }
  
    return data;
  }



  export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);
  
    if (alreadySaved) {
      // If the job is already saved, remove it
      const { data, error: deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id);
  
      if (deleteError) {
        console.error("Error removing saved job:", deleteError);
        return data;
      }
  
      return data;
    } else {
      // If the job is not saved, add it to saved jobs
      const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();
  
      if (insertError) {
        console.error("Error saving job:", insertError);
        return data;
      }
  
      return data;
    }
  }


  export async function deleteJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job_id)
      .select();
  
    if (deleteError) {
      console.error("Error deleting job:", deleteError);
      return data;
    }
  
    return data;
  }