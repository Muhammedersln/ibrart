import mongoose from 'mongoose';

const validPersonCounts = {
  '25x35': ['Tekli'],
  '35x50': ['Tekli', 'İkili', 'Üçlü'],
  '50x70': ['Tekli', 'İkili', 'Üçlü', 'Dörtlü', 'Beşli', 'Altılı']
};

const ArtworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Aile', 'Çift', 'Tek Portre', 'Karışık', 'Birleştirme Çizim', 'Duvar Resmi']
  },
  size: {
    type: String,
    required: true,
    enum: ['25x35', '35x50', '50x70']
  },
  personCount: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Tüm geçerli kişi sayılarını birleştirip içinde var mı diye bakıyoruz
        const allValidCounts = Object.values(validPersonCounts).flat();
        return allValidCounts.includes(value);
      },
      message: 'Geçersiz kişi sayısı'
    }
  },
  teknik: {
    type: String,
    required: true,
    enum: ['Karakalem', 'Renkli', 'Yağlı'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
    required: true
  },
}, {
  timestamps: true,
});

// Boyut ve kişi sayısı kombinasyonunu doğrulayan middleware
ArtworkSchema.pre('save', function(next) {
  if (validPersonCounts[this.size]?.includes(this.personCount)) {
    next();
  } else {
    next(new Error(`${this.size} boyutu için geçersiz kişi sayısı: ${this.personCount}`));
  }
});

ArtworkSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.size && update.personCount) {
    if (validPersonCounts[update.size]?.includes(update.personCount)) {
      next();
    } else {
      next(new Error(`${update.size} boyutu için geçersiz kişi sayısı: ${update.personCount}`));
    }
  } else {
    next();
  }
});

const Artwork = mongoose.models.Artwork || mongoose.model('Artwork', ArtworkSchema);

export default Artwork; 