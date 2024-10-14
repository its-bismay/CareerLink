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