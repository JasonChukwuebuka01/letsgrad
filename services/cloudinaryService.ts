
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
        
        // Create file from URI
       
        console.log("name", this.cloudName.length);
        console.log("Api", this.apiKey);
        console.log("Secret", this.apiSecret);

        const filename = imageUri.split('/').pop() || 'image';
        const match = /\.(\w+)$/.exec(filename);
    
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        formData.append('file', {
            uri: imageUri,
            name: filename,
            type
        } as any);

        if (transformation) {
            formData.append('transformation', JSON.stringify(transformation));
        }

        formData.append('upload_preset', 'ml_default'); // Create an unsigned upload preset in your Cloudinary dashboard
        
        const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            return await response.json();
        } catch (error: any) {
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