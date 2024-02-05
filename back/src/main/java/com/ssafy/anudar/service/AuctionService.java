package com.ssafy.anudar.service;

import com.ssafy.anudar.dto.SuccessWorkDto;
import com.ssafy.anudar.exception.BadRequestException;
import com.ssafy.anudar.exception.response.ExceptionStatus;
import com.ssafy.anudar.model.Auction;
import com.ssafy.anudar.model.SuccessWork;
import com.ssafy.anudar.model.User;
import com.ssafy.anudar.model.Work;
import com.ssafy.anudar.repository.AuctionRepository;
import com.ssafy.anudar.repository.SuccessWorkRepository;
import com.ssafy.anudar.repository.UserRepository;
import com.ssafy.anudar.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuctionService {
    private final WorkRepository workRepository;
    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;
    private final SuccessWorkRepository successWorkRepository;
    @Transactional
    public SuccessWorkDto saveSuccessWork (Long workId, Long userId, Long auctionId, int finalPrice){
        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.WORK_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.USER_NOT_FOUND));
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new BadRequestException(ExceptionStatus.AUCTION_NOT_FOUND));
        // 낙찰 이력 저장
        SuccessWork successWork = new SuccessWork(auction, work, user, finalPrice);
        successWorkRepository.save(successWork);

        return SuccessWorkDto.fromEntity(successWork);
    }
}
