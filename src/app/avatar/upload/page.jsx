'use client';
 
import Image from 'next/image';
import { useState, useRef } from 'react';
 
export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  return (
    <>
      <h5>Upload Logo</h5>
    
      <form
        onSubmit={async (event) => {
          event.preventDefault();
 
          const file = inputFileRef.current.files[0];
 
          const response = await fetch(
            `/api/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );
 
          const newBlob = (await response.json());
 
          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
          <Image src={blob.url} width={150} height={150} alt="upload file"/>
        </div>
      )}
    </>
  );
}