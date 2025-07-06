export const signup = async (req, res) => {
    const{email,password,fullName}=req.body;
    
};

export const login =async (req, res) => {
  res.send("Login controller working");
};

export const logout =async (req, res) => {
  res.send("Logout controller working");
};

