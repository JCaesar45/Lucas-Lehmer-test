function lucasLehmer(p) {
  // Check if p is an odd prime
  if (p === 2) return false;
  if (p < 3 || p % 2 === 0) return false;
  
  // Check if p is prime
  for (let i = 3; i * i <= p; i += 2) {
    if (p % i === 0) return false;
  }
  
  // Calculate Mersenne number: 2^p - 1 using BigInt
  const mersenne = (2n ** BigInt(p)) - 1n;
  
  // Lucas-Lehmer test
  let s = 4n;
  
  for (let i = 0; i < p - 2; i++) {
    s = (s * s - 2n) % mersenne;
  }
  
  return s === 0n;
}
