export const isJobActive = (status) => {
    return status;
};

export const matchesSearchQuery = (searchQuery, job) => {
    const searchLower = searchQuery.toLowerCase();
    return (
        job.title?.toLowerCase().includes(searchLower) ||
        job.jobRole?.[0]?.title?.toLowerCase().includes(searchLower) ||
        job.designation?.title?.toLowerCase().includes(searchLower) ||
        job.job?.organization?.orgName?.toLowerCase().includes(searchLower)
    );
};

export const matchesUsersSearchQuery = (searchQuery, job) => {
    const searchLower = searchQuery.toLowerCase();
    return (
        job?.role.toLowerCase().includes(searchLower) ||
        job?.email.toLowerCase().includes(searchLower)
    );
};

export const matchesApplicantsSearchQuery = (searchQuery, applicant) => {
    const searchLower = searchQuery.toLowerCase();
    return (
        applicant.name?.toLowerCase().includes(searchLower) ||
        applicant.applicant?.email?.toLowerCase().includes(searchLower) ||
        applicant.jobRole?.title?.toLowerCase().includes(searchLower) ||
        applicant.contactInfo?.toLowerCase().includes(searchLower) ||
        applicant.designation?.title?.toLowerCase().includes(searchLower) ||
        applicant.educations?.instituteName?.toLowerCase().includes(searchLower) || 
        applicant.educations?.fieldOfStudy?.title?.toLowerCase().includes(searchLower) ||
        applicant.educations?.degreeLevel?.title?.toLowerCase().includes(searchLower)
    );
};

export const filterJobs = (jobs, filters) => {
    if (!jobs) return [];

    return jobs.filter((job) => {
        // Search query filter
        if (filters.searchQuery && !matchesSearchQuery(filters.searchQuery, job)) {
            return false;
        }

        // Status filter
        if (filters.status !== 'all') {
            const isActive = isJobActive(job.jobStatus);
            if (filters.status === 'active' && !isActive) return false;
            if (filters.status === 'inactive' && isActive) return false;
        }

        // Job role filter
        if (filters.jobRole !== 'all' && job.jobRole?.[0]?.title !== filters.jobRole) {
            return false;
        }

        // Experience filter
        if (filters.experienceRange !== 'all') {
            const experience = parseInt(job.yearOfExperience) || 0;
            const [min, max] = filters.experienceRange.split('-').map(Number);
            if (experience < min || (max && experience > max)) return false;
        }

        return true;
    });
};

export const filterUsers = (jobs, filters) => {
    if (!jobs) return [];

    return jobs.filter((job) => {
        // Search query filter
        if (filters.searchQuery && !matchesUsersSearchQuery(filters.searchQuery, job)) {
            return false;
        }

        return true;
    });
};

export const filterApplicants = (applicants, filters) => {
    if (!applicants) return [];

    return applicants.filter((applicant) => {
        // Search query filter
        if (filters.searchQuery && !matchesApplicantsSearchQuery(filters.searchQuery, applicant)) {
            return false;
        }

        // Job role filter
        if (filters.jobRole !== 'all' && job.jobRole?.[0]?.title !== filters.jobRole) {
            return false;
        }

        // Experience filter
        if (filters.experienceRange !== 'all') {
            const experience = parseInt(applicant.yearOfExperience) || 0;
            const [min, max] = filters.experienceRange.split('-').map(Number);
            if (experience < min || (max && experience > max)) return false;
        }

        return true;
    });
};