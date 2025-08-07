export default function ImageCard({ src, alt }) {
    return (
      <div className="aspect-[148/210] overflow-hidden rounded-md shadow-md">
        {/* A5 aspect ratio approx 148mm x 210mm → ratio 148/210 */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  