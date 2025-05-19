import axios from 'axios';
import { AudienceBrief, AudienceResearchInput } from '../../types/audience';

/**
 * Runs audience research using our serverless API endpoint
 */
export async function runAudienceResearch({ url, rawText }: AudienceResearchInput): Promise<AudienceBrief> {
  try {
    if (!url && !rawText) {
      throw new Error('Either URL or raw text must be provided');
    }
    
    // Call our API endpoint
    const response = await axios.post('/api/audience-research', {
      url,
      rawText
    });
    
    // The API returns the audience brief directly
    const audienceBrief: AudienceBrief = response.data;
    
    // Validate the response
    if (!audienceBrief.productSummary || !audienceBrief.personas || !audienceBrief.funnel || 
        audienceBrief.personas.length === 0 || audienceBrief.funnel.length === 0) {
      throw new Error('Invalid audience brief generated');
    }
    
    return audienceBrief;
  } catch (error) {
    console.error('Error generating audience brief:', error);
    throw new Error('Failed to generate audience brief');
  }
} 