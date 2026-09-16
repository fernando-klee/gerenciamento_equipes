export async function generateOrganogram() {
    try {
        window.open(`/organograma`, '_blank');
    } catch (error) {
        console.log("Error:", error);
    }
};