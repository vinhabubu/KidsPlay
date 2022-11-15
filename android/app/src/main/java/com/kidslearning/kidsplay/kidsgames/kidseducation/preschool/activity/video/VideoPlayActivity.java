package com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.activity.video;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayerView;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.R;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.customclasses.Constant;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.model.ModelVideo;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.utils.Utils;

import java.util.ArrayList;

import uk.co.chrisjenx.calligraphy.CalligraphyContextWrapper;

public class VideoPlayActivity extends YouTubeBaseActivity implements YouTubePlayer.OnFullscreenListener {

    Context context;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_play);

        context = this;
        initDefine();
    }



    ArrayList<ModelVideo> arrOfVideoList;

    private void initDefine() {
        rvVideoList = findViewById(R.id.rvVideoList);
        youTubePlayerView = findViewById(R.id.youTubePlayerView);
        videoTitleOfVideo = findViewById(R.id.videoTitleOfVideo);
        Intent intent = getIntent();
        arrOfVideoList = (ArrayList<ModelVideo>) intent.getSerializableExtra("ArrayOfVideo");
        POSITION = intent.getIntExtra("Position", 0);
        setRvVideoAdapter();
        initVideoPlayer();

    }

    YouTubePlayerView youTubePlayerView;
    int POSITION;
    TextView videoTitleOfVideo;
    YouTubePlayer player = null;

    private void initVideoPlayer() {
        videoTitleOfVideo.setText(arrOfVideoList.get(POSITION).getVideoTitle());
        youTubePlayerView.initialize("AIzaSyDWYXoqet-qsx7obD5Aijj8-QmAA8Q2ZV0", new YouTubePlayer.OnInitializedListener() {
            @Override
            public void onInitializationSuccess(YouTubePlayer.Provider provider, final YouTubePlayer youTubePlayer, boolean b) {
                if (!b) {
                    player = youTubePlayer;
                    player.cueVideo(Constant.VIDEO_ID);
                }
            }

            @Override
            public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult youTubeInitializationResult) {
                Toast.makeText(context, "Failed To Load Video", Toast.LENGTH_SHORT).show();
            }
        });
    }



    RecyclerView rvVideoList;
    VideoAdapter videoAdapter;

    private void setRvVideoAdapter() {
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
        rvVideoList.setLayoutManager(linearLayoutManager);
        videoAdapter = new VideoAdapter();
        rvVideoList.setAdapter(videoAdapter);

    }

    boolean isFullScreen;
    @Override
    public void onFullscreen(boolean b) {
        this.isFullScreen=b;
    }


    class VideoAdapter extends RecyclerView.Adapter<VideoAdapter.ViewHolder> {

        class ViewHolder extends RecyclerView.ViewHolder {
            CardView cardView;
            ImageView imgThumbnail;
            TextView txtVideoTitle;

            ViewHolder(@NonNull View view) {
                super(view);
                this.txtVideoTitle = view.findViewById(R.id.txtVideoDescription);
                this.cardView = view.findViewById(R.id.cardViewMain);
                this.imgThumbnail = view.findViewById(R.id.ivThumbnailView);
            }
        }

        @NonNull
        public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
            return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.card_item_related_list, viewGroup, false));
        }

        public void onBindViewHolder(@NonNull ViewHolder viewHolder, final int i) {

            viewHolder.txtVideoTitle.setText(arrOfVideoList.get(i).getVideoTitle());

            Glide.with(context)
                    .load(arrOfVideoList.get(i).getVideoThumb())
                    .apply(new RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL))
                    .into(viewHolder.imgThumbnail);


            viewHolder.cardView.setOnClickListener(new View.OnClickListener() {
                public void onClick(View view) {
                    POSITION = i;
                    Constant.VIDEO_ID = arrOfVideoList.get(i).getVideoId();
                    if (player != null) {
                        player.cueVideo(Constant.VIDEO_ID);
                        videoTitleOfVideo.setText(arrOfVideoList.get(POSITION).getVideoTitle());
                    }
                }
            });
        }

        public int getItemCount() {
            return arrOfVideoList.size();
        }
    }


}
