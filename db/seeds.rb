City.destroy_all
User.destroy_all
Post.destroy_all

atlanta = City.create(name: "Atlanta", city_img: "https://i.imgur.com/SslIHMd.png")
chris = User.create(name: "Chris", pic: "https://scontent-atl3-1.cdninstagram.com/vp/109040b415fb09c86019e201e7a4300e/5C72307D/t51.2885-19/s320x320/25006611_2000806196840068_6208027273887481856_n.jpg", age: 29, location: "Atlanta", main_instrument: "guitar sing", skills: "singing, guitaring, drums, bass, piano", gear: "Reverend Charger-90 Vox NT-15 Custom build 1x10 cabinet", influences: "the strokes, radiohead, mew", bio: "im just a cool dude looking for some cool peeps to play music and rock and roll")
testpost1 = Post.create(title: "test", body: "test test test", user_id: chris.id, city_id: atlanta.id)