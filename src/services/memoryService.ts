import { supabase } from '@/integrations/supabase/client';
import { Memory, MemoryPhoto } from '@/types/memory';
import { v4 as uuidv4 } from 'uuid';

// Save a new memory and its photos
export const createMemory = async (memory: Memory, photos: string[]): Promise<string | null> => {
  try {
    // Insert the memory
    const { data: memoryData, error: memoryError } = await supabase
      .from('memories')
      .insert({
        page_title: memory.pageTitle,
        page_name: memory.pageName,
        email: memory.email,
        start_date: memory.startDate.toISOString(), // Convert Date to ISO string
        message: memory.message,
        spotify_url: memory.spotifyUrl,
        spotify_track_id: memory.spotifyTrackId,
        selected_emoji: memory.selectedEmoji,
        selected_plan: memory.selectedPlan
      })
      .select('id')
      .single();

    if (memoryError) {
      console.error('Error creating memory:', memoryError);
      return null;
    }

    const memoryId = memoryData.id;

    // Save photos if any
    if (photos.length > 0) {
      const photoInserts = photos.map(photoUrl => ({
        memory_id: memoryId,
        photo_url: photoUrl
      }));

      const { error: photosError } = await supabase
        .from('memory_photos')
        .insert(photoInserts);

      if (photosError) {
        console.error('Error saving photos:', photosError);
        // Continue anyway, since the memory was created
      }
    }

    return memoryId;
  } catch (error) {
    console.error('Error in createMemory:', error);
    return null;
  }
};

// Upload a photo to Supabase storage
export const uploadPhoto = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('memory_photos')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading photo:', uploadError);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('memory_photos')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadPhoto:', error);
    return null;
  }
};

// Get a memory by its page name (slug)
export const getMemoryByPageName = async (pageName: string): Promise<{ memory: Memory | null, photos: MemoryPhoto[] }> => {
  try {
    // Get the memory
    const { data: memoryData, error: memoryError } = await supabase
      .from('memories')
      .select('*')
      .eq('page_name', pageName)
      .single();

    if (memoryError) {
      console.error('Error fetching memory:', memoryError);
      return { memory: null, photos: [] };
    }

    if (!memoryData) {
      return { memory: null, photos: [] };
    }

    // Get the photos
    const { data: photoData, error: photosError } = await supabase
      .from('memory_photos')
      .select('*')
      .eq('memory_id', memoryData.id);

    if (photosError) {
      console.error('Error fetching photos:', photosError);
      return { 
        memory: mapDatabaseToMemory(memoryData), 
        photos: [] 
      };
    }

    return {
      memory: mapDatabaseToMemory(memoryData),
      photos: (photoData || []).map(photo => ({
        id: photo.id,
        memoryId: photo.memory_id,
        photoUrl: photo.photo_url,
        createdAt: new Date(photo.created_at)
      }))
    };
  } catch (error) {
    console.error('Error in getMemoryByPageName:', error);
    return { memory: null, photos: [] };
  }
};

// Check if a page name is available
export const checkPageNameAvailability = async (pageName: string): Promise<boolean> => {
  try {
    // Format the page name (convert to lowercase, remove spaces, etc.)
    const formattedPageName = pageName
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters
    
    if (!formattedPageName) return false;
    
    // Check if there's already a memory with this page name
    const { data, error } = await supabase
      .from('memories')
      .select('id')
      .eq('page_name', formattedPageName)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // Error code PGRST116 means no rows returned, which means name is available
      return true;
    }
    
    // If we got data, the name is taken
    return !data;
  } catch (error) {
    console.error('Error checking page name availability:', error);
    return false;
  }
};

// Map database record to Memory object
const mapDatabaseToMemory = (data: any): Memory => {
  return {
    id: data.id,
    pageTitle: data.page_title,
    pageName: data.page_name,
    email: data.email,
    startDate: new Date(data.start_date),
    message: data.message,
    spotifyUrl: data.spotify_url,
    spotifyTrackId: data.spotify_track_id,
    selectedEmoji: data.selected_emoji,
    selectedPlan: data.selected_plan as 'annual' | 'forever',
    createdAt: new Date(data.created_at)
  };
};
