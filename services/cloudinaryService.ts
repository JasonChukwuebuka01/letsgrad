type UploadApiResponse = {
    secure_url: string;
    public_id: string;
    [key: string]: any;
};

interface TransformationOptions {
    prompt: string;
    toColor?: string;
}

class CloudinaryAIService {
    private cloudName: string;
    private apiKey: string;
    private apiSecret: string;

    constructor() {
        this.cloudName = "dcyjr883i";
        this.apiKey = "692177321334664";
        this.apiSecret = "wzOLk0-UkPSrVQRPeUX2LmKVl-w";

        if (!this.cloudName || !this.apiKey || !this.apiSecret) {
            throw new Error('Cloudinary configuration is missing required credentials');
        }
    }

    private async uploadToCloudinary(imageUri: string, transformation?: any): Promise<UploadApiResponse> {
        const formData = new FormData();
        
        try {
            // Create file from URI
            const filename = imageUri.split('/').pop() || 'image';
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image/jpeg';
            
            // Debug the file object being created
            console.log('Preparing upload for:', { filename, type });
            
            formData.append('file', {
                uri: imageUri,
                name: filename,
                type
            } as any);

            if (transformation) {
                formData.append('transformation', JSON.stringify(transformation));
            }

            formData.append('upload_preset', 'ml_default');
            
            const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
            
            console.log('Uploading to:', url);
            
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    // Removing Content-Type header - let fetch set it automatically for FormData
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Upload failed with status:', response.status);
                console.error('Error details:', errorText);
                throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('Upload successful:', result);
            return result;
        } catch (error: any) {
            console.error('Upload error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }
    }

    async generativeRemove(filePath: string, options: TransformationOptions): Promise<UploadApiResponse> {
        try {
            return await this.uploadToCloudinary(filePath, {
                effect: `gen_remove:prompt_${options.prompt}`,
            });
        } catch (error: any) {
            throw new Error(`Generative Remove failed: ${error.message}`);
        }
    }

    async generativeRecolor(filePath: string, options: TransformationOptions): Promise<UploadApiResponse> {
        try {
            if (!options.toColor) {
                throw new Error('toColor is required for Generative Recolor');
            }
            return await this.uploadToCloudinary(filePath, {
                effect: `gen_recolor:prompt_${options.prompt};to-color_${options.toColor}`,
            });
        } catch (error: any) {
            throw new Error(`Generative Recolor failed: ${error.message}`);
        }
    }

    async applyTransformation(filePath: string, transformations: any[]): Promise<UploadApiResponse> {
        try {
            return await this.uploadToCloudinary(filePath, transformations);
        } catch (error: any) {
            throw new Error(`Transformation failed: ${error.message}`);
        }
    }
}

// Export a singleton instance of the service
export const cloudinaryAIService = new CloudinaryAIService();